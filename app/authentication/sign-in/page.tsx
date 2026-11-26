"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { PathLinks } from "@/enums/path-links";
import { useLogin } from "@/hooks/use-login";
import { appToast } from "@/libs/toast";
import { LoginForm } from "@/types/login-form";
import { Eye, EyeOff, LockKeyholeIcon, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginForm>();

    const onSubmit = async (formData: LoginForm) => {
        const toastId = toast.add({
            type: 'loading',
            description: 'Entrando...'
        })

        try {
            await loginMutation.mutateAsync(formData);

            appToast.success('Login realizado com sucesso!');
            router.push(PathLinks.DASHBOARD);
        } finally {
            toast.close(toastId);
        }
    }

    return (
        <main className="flex items-center justify-center w-full min-h-[100dvh] bg-neutral-100 px-4">
            <Card className="w-full max-w-md shadow-md">
                <CardHeader className="space-y-1 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Bem-vindo de volta!</h1>
                    <p className="text-sm text-gray-500 text-muted-foreground">Acesse sua conta para continuar gerenciando sua equipe.</p>
                </CardHeader>

                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-1">
                            <div className="relative">
                                <Mail className="absolute top-1/5 left-2" size={17} />
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    {...register("email")}
                                    className="pl-8"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <div className="relative">
                                <LockKeyholeIcon className="absolute top-1/5 left-2" size={17} />
                                <Input
                                    placeholder="Senha"
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    className="pr-10 pl-8"
                                />

                                <Button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 bg-transparent top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-transparent"
                                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </Button>
                            </div>

                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className=" w-full bg-purple-700 hover:bg-purple-600 font-semibold cursor-pointer"
                        >
                            {loginMutation.isPending ? "Entrando..." : "Entrar na minha conta"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        @ 2026 WorkPlus
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}