export const defaultCommercialConfig = {
  meta: {
    version: "1.0.0",
    brandName: "Charlom",
    currency: "COP",
    locale: "es-CO",
    usdToCop: 4100,
    exportedFileName: "charlom-commercial-config.json"
  },
  copy: {
    heroTitle: "De vender productos a construir un ecosistema comercial conectado.",
    heroSubtitle:
      "Una infraestructura diseñada alrededor de Charlom para conectar ventas, inventario, clientes, WhatsApp, pagos y gestión en una misma operación.",
    philosophy: "La herramienta se adapta al negocio, no el negocio a la herramienta.",
    centralMessage:
      "Charlom no necesita simplemente una página web. Necesita una infraestructura digital que conecte lo que hoy ocurre en canales separados y lo convierta en un proceso medible, controlable y escalable.",
    printFooter:
      "Propuesta preliminar para conversación comercial. Valores editables y alcance definitivo sujeto a onboarding."
  },
  assumptions: [
    "No se inventan métricas actuales ni procesos internos no levantados.",
    "La personalización avanzada de tenis queda sujeta al levantamiento durante onboarding.",
    "Tarifas de pasarelas, Meta, WhatsApp, VPS y licencias están sujetas a condiciones vigentes del proveedor.",
    "Los cambios del panel admin se guardan en localStorage del navegador actual."
  ],
  stages: [
    {
      title: "Entender",
      description: "Analizamos el negocio a fondo.",
      icon: "users"
    },
    {
      title: "Diseñar",
      description: "Planeamos la solución a la medida.",
      icon: "target"
    },
    {
      title: "Validar",
      description: "Validamos procesos, reglas y alcance.",
      icon: "clipboard"
    },
    {
      title: "Implementar",
      description: "Construimos la infraestructura.",
      icon: "code"
    },
    {
      title: "Automatizar",
      description: "Conectamos y automatizamos.",
      icon: "settings"
    },
    {
      title: "Medir",
      description: "Medimos resultados reales.",
      icon: "chart"
    },
    {
      title: "Escalar",
      description: "Evolucionamos con el negocio.",
      icon: "rocket"
    }
  ],
  pipeline: [
    "Nuevo lead",
    "Contactado",
    "Interesado",
    "Cotización / Personalización",
    "Pago pendiente",
    "Venta",
    "Postventa"
  ],
  infrastructurePlans: {
    essential: {
      id: "essential",
      name: "Essential",
      usdMonthly: 10,
      description: "VPS administrado para una primera fase liviana."
    },
    recommended: {
      id: "recommended",
      name: "Recommended",
      usdMonthly: 15,
      description: "Mayor margen operativo para crecer módulos y automatizaciones."
    }
  },
  selectedInfrastructurePlan: "recommended",
  alegraPlans: {
    emprendedor: {
      id: "emprendedor",
      name: "Emprendedor",
      monthlyPrice: 74900
    },
    pyme: {
      id: "pyme",
      name: "Pyme",
      monthlyPrice: 163900
    },
    pro: {
      id: "pro",
      name: "Pro",
      monthlyPrice: 250900
    }
  },
  selectedAlegraPlan: "pyme",
  paymentProviders: [
    {
      name: "Bold",
      notes: "Buena conexión entre operación física y digital."
    },
    {
      name: "Wompi",
      notes: "Fuerte en pagos digitales, PSE y operación online."
    },
    {
      name: "Mercado Pago",
      notes: "Alternativa conocida para pagos digitales y conciliación."
    }
  ],
  modules: [
    {
      id: "onboarding",
      category: "Fase 0",
      name: "Descubrimiento, onboarding y arquitectura",
      shortName: "Onboarding",
      description:
        "Sesiones intensivas para mapear operación, tienda física, ventas, WhatsApp, inventario, administración, roles y alcance definitivo.",
      implementationPrice: 500000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 8,
      active: true,
      defaultSelected: true,
      required: true,
      timelineGroup: "discovery",
      highlights: ["1 a 3 sesiones de trabajo", "Mapa de procesos", "Arquitectura validada"]
    },
    {
      id: "ecommerce",
      category: "Ventas",
      name: "E-commerce Charlom",
      shortName: "E-commerce",
      description:
        "Catálogo, variantes, tallas, stock, carrito, checkout, pedidos, clientes, panel administrativo y SEO básico.",
      implementationPrice: 3100000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 20,
      active: true,
      defaultSelected: true,
      timelineGroup: "commerce",
      highlights: ["Compra directa o por WhatsApp", "Productos y stock", "Base para personalización futura"]
    },
    {
      id: "additional-gateway",
      category: "Pagos",
      name: "Pasarela adicional",
      shortName: "Pasarela extra",
      description:
        "Integración adicional a la pasarela principal para ampliar medios de pago o estrategias de conciliación.",
      implementationPrice: 350000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 3,
      active: true,
      defaultSelected: false,
      timelineGroup: "commerce",
      highlights: ["Bold, Wompi o Mercado Pago", "Tarifas sujetas al proveedor", "Sin pasarela in-house"]
    },
    {
      id: "crm-inhouse",
      category: "Gestión",
      name: "CRM Charlom in-house",
      shortName: "CRM propio",
      description:
        "CRM diseñado alrededor del flujo comercial real de Charlom: leads, clientes, oportunidades, tareas, pedidos y postventa.",
      implementationPrice: 1500000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 13,
      active: true,
      defaultSelected: true,
      exclusiveGroup: "crm",
      timelineGroup: "data",
      highlights: ["Pipeline a la medida", "Sin licencia por usuario", "Integración profunda"]
    },
    {
      id: "crm-external",
      category: "Gestión",
      name: "Implementación CRM externo",
      shortName: "CRM externo",
      description:
        "Configuración inicial de una herramienta externa como HubSpot, ClickUp u otra solución madura según estrategia.",
      implementationPrice: 650000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 6,
      active: true,
      defaultSelected: false,
      exclusiveGroup: "crm",
      timelineGroup: "data",
      highlights: ["Salida más rápida", "Licencias externas separadas", "Menor desarrollo inicial"]
    },
    {
      id: "automation",
      category: "Automatización",
      name: "Automatizaciones comerciales",
      shortName: "Automatización",
      description:
        "Workflows con n8n para seguimiento, sincronizaciones, notificaciones, eventos y tareas repetitivas.",
      implementationPrice: 750000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 7,
      active: true,
      defaultSelected: true,
      timelineGroup: "automation",
      highlights: ["Seguimiento automático", "Control humano", "Eventos comerciales"]
    },
    {
      id: "whatsapp-api",
      category: "Canales",
      name: "WhatsApp Business Platform",
      shortName: "WhatsApp API",
      description:
        "Migración progresiva hacia API oficial de Meta para trazabilidad, múltiples asesores, automatización y CRM.",
      implementationPrice: 650000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 6,
      active: true,
      defaultSelected: true,
      timelineGroup: "automation",
      highlights: ["API oficial Meta", "Consumo variable separado", "Base para chatbot"]
    },
    {
      id: "chatbot",
      category: "Canales",
      name: "Chatbot comercial",
      shortName: "Chatbot",
      description:
        "Primera capa de atención para clasificar leads, responder preguntas frecuentes, consultar stock y transferir a asesor humano.",
      implementationPrice: 1100000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 10,
      active: true,
      defaultSelected: false,
      timelineGroup: "automation",
      highlights: ["No reemplaza vendedores", "Clasificación comercial", "Acompañamiento inicial"]
    },
    {
      id: "meta-business",
      category: "Marketing",
      name: "Infraestructura Meta Business",
      shortName: "Meta Business",
      description:
        "Configuración de Meta Business, Instagram, Facebook, Pixel, Conversion API, eventos y conexión comercial.",
      implementationPrice: 550000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 5,
      active: true,
      defaultSelected: false,
      timelineGroup: "marketing",
      highlights: ["Eventos y Pixel", "Leads conectados", "Base para pauta"]
    },
    {
      id: "admin-inhouse",
      category: "Administración",
      name: "Sistema administrativo Charlom",
      shortName: "Admin propio",
      description:
        "Gestión administrativa y gerencial para ventas, ingresos, egresos, costos, márgenes, inventarios y reportes.",
      implementationPrice: 1800000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 15,
      active: true,
      defaultSelected: false,
      exclusiveGroup: "admin",
      timelineGroup: "admin",
      highlights: ["No reemplaza software fiscal certificado", "Dashboards gerenciales", "Control operativo"]
    },
    {
      id: "alegra-integration",
      category: "Administración",
      name: "Integración con Alegra",
      shortName: "Alegra",
      description:
        "Integración o acompañamiento de operación con Alegra según plan seleccionado y necesidades de Charlom.",
      implementationPrice: 600000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 6,
      active: true,
      defaultSelected: false,
      exclusiveGroup: "admin",
      timelineGroup: "admin",
      externalPlanKey: "alegra",
      highlights: ["Licencia separada", "Planes editables", "Conciliación y administración"]
    },
    {
      id: "dashboard",
      category: "Datos",
      name: "Dashboard gerencial",
      shortName: "Dashboard",
      description:
        "Vista ejecutiva para ventas, leads, conversión, canales, inventario, productos, clientes, recompra y tiempos de respuesta.",
      implementationPrice: 500000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 5,
      active: true,
      defaultSelected: true,
      timelineGroup: "data",
      highlights: ["Métricas sin inventar históricos", "Visibilidad gerencial", "Base para decisiones"]
    },
    {
      id: "marketing-managed",
      category: "Marketing",
      name: "Marketing administrado",
      shortName: "Marketing",
      description:
        "Servicio recurrente opcional para campañas, anuncios, optimización, contenido, seguimiento y reporting.",
      implementationPrice: 400000,
      monthlyPrice: 1200000,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 5,
      active: true,
      defaultSelected: false,
      timelineGroup: "marketing",
      highlights: ["Honorarios separados de pauta", "Optimización continua", "Reporting"]
    }
  ],
  discounts: {
    implementationPercent: 0,
    monthlyPercent: 0
  },
  recurring: {
    maintenanceMonthly: 0,
    supportMonthly: 0,
    sslAnnual: 0
  }
};
