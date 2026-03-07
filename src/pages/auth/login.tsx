import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";

const formSchema = z.object({
  email: z.email().min(2).max(50),
  password: z.string().min(4).max(50),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["auth/profile"],
    queryFn: async () => {
      const response = await axios.get("/auth/profile");
      return response.data;
    },
    enabled: false,
  });
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/auth/logout");
      return response;
    },
  });
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await axios.post("/auth/login", values);
      return response;
    },
    onSuccess: async () => {
      console.log("Login successful");
      const profileData = await query.refetch();
      if (profileData.data) {
        const data = profileData.data as { data: { role: string } };
        if (data.data.role === "user") {
          logoutMutation.mutate();
        }
        navigate("/dashboard");
        toast.success("Login successful!");
      }
    },
    onError: (error) => {
      toast.error("Login failed. Please check your credentials and try again.");
      console.error("Login failed", error);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <Form {...form}>
              <CardContent className="grid p-0 md:grid-cols-2">
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="p-6 md:p-8"
                >
                  <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                      <h1 className="text-2xl font-bold">Welcome back</h1>
                      <p className="text-muted-foreground text-balance">
                        Login to your Acme Inc account
                      </p>
                    </div>
                    <FormField
                      disabled={
                        mutation.isPending ||
                        query.isLoading ||
                        logoutMutation.isPending
                      }
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="johnwick@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the email associated with your account.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      disabled={
                        mutation.isPending ||
                        query.isLoading ||
                        logoutMutation.isPending
                      }
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter your account password.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Field>
                      <Button
                        disabled={
                          mutation.isPending ||
                          query.isLoading ||
                          logoutMutation.isPending
                        }
                        type="submit"
                      >
                        Login
                      </Button>
                    </Field>
                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                      Or continue with
                    </FieldSeparator>
                    <Field className="grid grid-cols-3 gap-4">
                      <Button variant="outline" type="button" disabled>
                        <Icons.apple className="h-5 w-5" />
                        <span className="sr-only">Login with Apple</span>
                      </Button>
                      <Button variant="outline" type="button" disabled>
                        <Icons.google className="h-5 w-5" />
                        <span className="sr-only">Login with Google</span>
                      </Button>
                      <Button variant="outline" type="button" disabled>
                        <Icons.meta className="h-5 w-5" />
                        <span className="sr-only">Login with Meta</span>
                      </Button>
                    </Field>
                    <FieldDescription className="text-center">
                      Don&apos;t have an account? <a href="#">Sign up</a>
                    </FieldDescription>
                  </FieldGroup>
                </form>
                <div className="bg-muted relative hidden md:block">
                  <img
                    src="/placeholder.svg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                  />
                </div>
              </CardContent>
            </Form>
          </Card>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our{" "}
            <Link to="#">Terms of Service</Link> and{" "}
            <Link to="#">Privacy Policy</Link>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
