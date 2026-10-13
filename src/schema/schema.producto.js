import z from 'zod'

const validatedProduct = z.object({
    codigo: z
        .string()
        .trim()
        .min(1, 'El código debe contener al menos 1 caracter')
        .max(20, 'El código no puede ser mayor de 20 caracteres'),

    nombre: z
        .string()
        .trim()
        .min(3, 'El nombre debe contener al menos 3 caracter')
        .max(100, 'El nombre no puede ser mayor a 100 caracteres'),

    categoria: z
        .string()
        .trim()
        .min(1, 'La categoría debe contener al menos 1 caracter')
        .max(50, 'La categoría no puede ser mayor a 50 caracteres'),

    marca: z
        .string()
        .trim()
        .min(1, 'La marca debe contener al menos 1 caracter')
        .max(50, 'La marca no puede ser mayor a 50 caracteres'),

    descripcion: z
        .string()
        .optional(),

    precio: z.any(),
        //.number('El precio deben ser números decimales').optional(),
    stock: z.any()
        //.number('El stock debe ser un número entero válido').optional()
})

export { validatedProduct }