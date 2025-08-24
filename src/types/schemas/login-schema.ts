import z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Por favor, insira um email válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').max(50, 'A senha deve ter no máximo 50 caracteres'),
})