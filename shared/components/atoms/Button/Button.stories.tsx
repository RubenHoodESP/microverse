import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Un componente de botón accesible y personalizable que se adapta al sistema de diseño de la aplicación.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'secondary',
        'outline',
        'ghost',
        'link',
        'destructive',
        'success',
        'warning',
        'info',
      ],
      description: 'Estilo visual del botón',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'xl', 'icon', 'icon-sm', 'icon-lg'],
      description: 'Tamaño del botón',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Muestra spinner y deshabilita el botón',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el botón',
    },
    children: {
      control: { type: 'text' },
      description: 'Contenido del botón',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Botón por defecto
export const Default: Story = {
  args: {
    children: 'Botón por defecto',
  },
};

// Todas las variantes
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="info">Info</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Todas las variantes disponibles del componente Button.',
      },
    },
  },
};

// Todos los tamaños
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="icon">🔍</Button>
      <Button size="icon-sm">⚙️</Button>
      <Button size="icon-lg">❤️</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Todos los tamaños disponibles del componente Button.',
      },
    },
  },
};

// Estados
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Normal</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
      <Button loading disabled>
        Loading + Disabled
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Diferentes estados del botón: normal, cargando, deshabilitado y combinación de estados.',
      },
    },
  },
};

// Ejemplos de uso real
export const LoginForm: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <h3 className="text-lg font-semibold">Iniciar sesión</h3>
      <div className="space-y-2">
        <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-lg" />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="space-y-2">
        <Button type="submit" className="w-full" loading={false}>
          Iniciar sesión
        </Button>
        <Button variant="outline" type="button" className="w-full">
          Crear cuenta
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de uso en un formulario de login con botones principales y secundarios.',
      },
    },
  },
};

export const PostActions: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm">
        ❤️ Me gusta
      </Button>
      <Button variant="ghost" size="sm">
        💬 Comentar
      </Button>
      <Button variant="ghost" size="sm">
        📤 Compartir
      </Button>
      <Button variant="ghost" size="sm">
        🔖 Guardar
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de acciones típicas en un post de red social.',
      },
    },
  },
};

export const AdminPanel: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="success" size="sm">
        ✅ Aprobar
      </Button>
      <Button variant="warning" size="sm">
        ⚠️ Revisar
      </Button>
      <Button variant="destructive" size="sm">
        ❌ Rechazar
      </Button>
      <Button variant="info" size="sm">
        ℹ️ Detalles
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de panel de administración con diferentes tipos de acciones.',
      },
    },
  },
};

// Accesibilidad
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Navegación por teclado</h4>
        <div className="flex gap-2">
          <Button>Primer botón</Button>
          <Button variant="secondary">Segundo botón</Button>
          <Button variant="outline">Tercer botón</Button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Usa Tab para navegar entre botones, Enter o Space para activar.
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Estados de foco</h4>
        <div className="flex gap-2">
          <Button>Foco visible</Button>
          <Button disabled>Deshabilitado</Button>
          <Button loading>En carga</Button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Los botones muestran claramente su estado de foco con anillos de colores.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplos de accesibilidad: navegación por teclado y estados de foco.',
      },
    },
  },
};

// Variantes individuales para documentación
export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Botón principal',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Botón secundario',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Botón outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Botón ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Botón link',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Botón destructivo',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Botón éxito',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Botón advertencia',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Botón información',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Botón pequeño',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Botón grande',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: 'Botón extra grande',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '🔍',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Cargando...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Deshabilitado',
  },
};
