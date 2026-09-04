export const defaultCommercialConfig = {
  meta: {
    version: "2.1.0",
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
    "E-commerce Charlom incluye una pasarela de pago principal; una pasarela adicional representa un costo extra según alcance y proveedor.",
    "Las herramientas de terceros como Alegra, HubSpot, ClickUp, Meta o pasarelas conservan sus tarifas, políticas y condiciones vigentes.",
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
      title: "Conectar",
      description: "Integramos canales, CRM y datos.",
      icon: "share"
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
  categoryOrder: [
    "Fase 0",
    "Infraestructura web",
    "Ventas",
    "Gestión",
    "Administrativo",
    "Facturación electrónica",
    "Canales",
    "Estructura de negocio",
    "Marketing"
  ],
  infrastructurePlans: {},
  selectedInfrastructurePlan: null,
  alegraPlans: {
    emprendedor: {
      id: "emprendedor",
      name: "Emprendedor",
      monthlyPrice: 74900,
      annualPrice: 898800,
      description: "Operación administrativa inicial con licencia de tercero."
    },
    pyme: {
      id: "pyme",
      name: "MiPyme",
      monthlyPrice: 163900,
      annualPrice: 1966800,
      description: "Plan intermedio para operación con mayor volumen."
    },
    pro: {
      id: "pro",
      name: "Pro",
      monthlyPrice: 250900,
      annualPrice: 3010800,
      description: "Plan avanzado para administración más robusta."
    }
  },
  selectedAlegraPlan: "pyme",
  electronicInvoicePlans: {
    emprendedor: {
      id: "emprendedor",
      name: "Emprendedor",
      monthlyPrice: 17900,
      annualPrice: 161100,
      description: "Solo facturación. Ingresos hasta $10.000.000 mensuales.",
      features: [
        "Facturas de venta ilimitadas",
        "1 usuario con acceso",
        "1 usuario gratis para tu contador",
        "Soporte 24/7 gratis"
      ]
    },
    pyme: {
      id: "pyme",
      name: "Pyme",
      monthlyPrice: 49900,
      annualPrice: 449100,
      description: "Solo facturación. Ingresos hasta $40.000.000 mensuales.",
      features: [
        "Facturas de venta ilimitadas",
        "2 usuarios con acceso",
        "1 usuario gratis para tu contador",
        "Soporte 24/7 gratis"
      ]
    },
    pro: {
      id: "pro",
      name: "Pro",
      monthlyPrice: 99900,
      annualPrice: 899100,
      description: "Solo facturación. Ingresos hasta $180.000.000 mensuales.",
      recommended: true,
      features: [
        "Facturas de venta ilimitadas",
        "3 usuarios con acceso",
        "1 usuario gratis para tu contador",
        "Soporte 24/7 gratis"
      ]
    },
    plus: {
      id: "plus",
      name: "Plus",
      monthlyPrice: 179900,
      annualPrice: 1619100,
      description: "Solo facturación. Ingresos hasta $500.000.000 mensuales.",
      features: [
        "Facturas de venta ilimitadas",
        "5 usuarios con acceso",
        "1 usuario gratis para tu contador",
        "Soporte 24/7 gratis"
      ]
    }
  },
  selectedElectronicInvoicePlan: "pro",
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
      name: "Onboarding",
      shortName: "Onboarding",
      description:
        "Descubrimiento, entendimiento del negocio, arquitectura inicial y alcance definitivo antes de construir.",
      implementationPrice: 0,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 8,
      active: true,
      defaultSelected: true,
      required: true,
      timelineGroup: "discovery",
      highlights: ["Sesiones de trabajo", "Mapa de procesos", "Arquitectura validada"]
    },
    {
      id: "ecommerce",
      category: "Ventas",
      name: "E-commerce Charlom",
      shortName: "E-commerce",
      description:
        "Catálogo, variantes, tallas, stock, carrito, checkout, pedidos, clientes, panel administrativo y SEO básico.",
      implementationPrice: 1700000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 18,
      active: true,
      defaultSelected: true,
      timelineGroup: "commerce",
      highlights: [
        "Incluye una pasarela de pago principal",
        "Pasarela adicional con costo extra",
        "Productos, stock y checkout"
      ]
    },
    {
      id: "additional-gateway",
      category: "Pagos",
      name: "Pasarela adicional",
      shortName: "Pasarela extra",
      description:
        "Integración adicional a la pasarela principal para ampliar medios de pago o estrategias de conciliación.",
      implementationPrice: 0,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 3,
      active: false,
      defaultSelected: false,
      timelineGroup: "commerce",
      highlights: ["Se cotiza aparte", "Sujeta al proveedor", "No se incluye por defecto"]
    },
    {
      id: "crm-inhouse",
      category: "Gestión",
      name: "CRM Charlom in-house",
      shortName: "CRM propio",
      description:
        "CRM diseñado alrededor del flujo comercial real de Charlom: leads, clientes, oportunidades, tareas, pedidos, postventa, dashboard y datos operativos.",
      implementationPrice: 1500000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 13,
      active: true,
      defaultSelected: true,
      exclusiveGroup: "crm",
      timelineGroup: "data",
      highlights: ["Pipeline a la medida", "Datos integrados en el CRM", "Sin licencia por usuario"]
    },
    {
      id: "crm-external",
      category: "Gestión",
      name: "CRM externo",
      shortName: "CRM externo",
      description:
        "Implementación de una herramienta externa como HubSpot, ClickUp u otra solución madura. Es más rápida, pero menos personalizable.",
      implementationPrice: 1100000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 7,
      active: true,
      defaultSelected: false,
      exclusiveGroup: "crm",
      timelineGroup: "data",
      highlights: ["Menos personalizable", "Licencias externas separadas", "Salida más rápida"]
    },
    {
      id: "automation",
      category: "Automatización",
      name: "Automatizaciones comerciales",
      shortName: "Automatización",
      description:
        "Workflows con n8n para seguimiento, sincronizaciones, notificaciones, eventos y tareas repetitivas.",
      implementationPrice: 0,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 7,
      active: false,
      defaultSelected: false,
      timelineGroup: "automation",
      highlights: ["Retirado del configurador", "Puede revisarse después", "No se cobra como módulo separado"]
    },
    {
      id: "admin-inhouse",
      category: "Administrativo",
      name: "Sistema administrativo in-house",
      shortName: "Admin propio",
      description:
        "Gestión administrativa y gerencial para ventas, ingresos, egresos, costos, márgenes, inventarios y reportes.",
      implementationPrice: 1500000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 14,
      active: true,
      defaultSelected: true,
      exclusiveGroup: "admin",
      timelineGroup: "admin",
      highlights: ["No reemplaza software fiscal certificado", "Dashboards gerenciales", "Control operativo"]
    },
    {
      id: "alegra-integration",
      category: "Administrativo",
      name: "Alegra",
      shortName: "Alegra",
      description:
        "Uso de Alegra como tercero para la gestión administrativa. La licencia depende del plan elegido y conserva menor personalización que una solución propia.",
      implementationPrice: 0,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 5,
      active: true,
      defaultSelected: false,
      exclusiveGroup: "admin",
      timelineGroup: "admin",
      externalPlanKey: "alegra",
      highlights: ["Planes Emprendedor, Pyme o Pro", "Costo mensual y anual visible", "Menos personalizable"]
    },
    {
      id: "chatbot",
      category: "Canales",
      name: "Chatbot comercial",
      shortName: "Chatbot",
      description:
        "Chatbot comercial para clasificar leads, responder preguntas frecuentes, consultar stock y transferir a asesor humano.",
      implementationPrice: 1000000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 9,
      active: true,
      defaultSelected: true,
      timelineGroup: "automation",
      highlights: ["Atención inicial", "Trazabilidad comercial", "Conecta con CRM y ventas"]
    },
    {
      id: "whatsapp-api",
      category: "Canales",
      name: "Migración API oficial de Meta",
      shortName: "API Meta",
      description:
        "Implementación de la API oficial de Meta para WhatsApp, trazabilidad, automatizaciones y conexión operativa del chatbot.",
      implementationPrice: 300000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 4,
      active: true,
      defaultSelected: false,
      timelineGroup: "automation",
      highlights: ["API oficial Meta", "Consumos de Meta separados", "Base para trazabilidad"]
    },
    {
      id: "business-structure",
      category: "Estructura de negocio",
      name: "Flujo comercial end to end",
      shortName: "Flujo end to end",
      description:
        "Diseño del flujo comercial completo para conectar adquisición, atención, venta, operación, seguimiento y decisión.",
      implementationPrice: 800000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 7,
      active: true,
      defaultSelected: true,
      timelineGroup: "strategy",
      highlights: ["Proceso comercial claro", "Menos fricción operativa", "Base para escalar"]
    },
    {
      id: "software-infrastructure",
      category: "Infraestructura web",
      name: "Infraestructura del software",
      shortName: "Infraestructura",
      description:
        "Base técnica administrada para alojar, conectar y mantener la operación digital de Charlom.",
      implementationPrice: 700000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 5,
      active: true,
      defaultSelected: true,
      timelineGroup: "infrastructure",
      highlights: ["Software preparado para crecer", "Ambiente administrado", "Conexiones operativas"]
    },
    {
      id: "domain",
      category: "Infraestructura web",
      name: "Dominio",
      shortName: "Dominio",
      description:
        "Configuración base del dominio para publicar el sitio y conectar la presencia digital principal.",
      implementationPrice: 50000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 1,
      active: true,
      defaultSelected: true,
      timelineGroup: "infrastructure",
      highlights: ["Dominio principal", "Configuración DNS", "Publicación inicial"]
    },
    {
      id: "meta-business",
      category: "Marketing",
      name: "Infraestructura Meta Business",
      shortName: "Meta Business",
      description:
        "Configuración de Meta Business, Instagram, Facebook, Pixel, Conversion API, eventos y conexión comercial.",
      implementationPrice: 0,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 5,
      active: false,
      defaultSelected: false,
      timelineGroup: "marketing",
      highlights: ["Consolidado en Gestión de marketing", "No se cobra como módulo separado", "Base incluida en marketing"]
    },
    {
      id: "marketing-managed",
      category: "Marketing",
      name: "Gestión de marketing",
      shortName: "Marketing",
      description:
        "Gestión de marketing con infraestructura Meta Business, campañas, optimización, seguimiento y reporting consolidado en un solo ítem.",
      implementationPrice: 1000000,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 7,
      active: true,
      defaultSelected: true,
      timelineGroup: "marketing",
      highlights: ["Meta Business incluido", "Pauta separada", "Gestión y reporting"]
    },
    {
      id: "electronic-invoice",
      category: "Facturación electrónica",
      name: "Facturación electrónica Alegra",
      shortName: "Facturación",
      description:
        "Plan de facturación electrónica de Alegra. No incluye módulo contable y se elige según facturas, usuarios e ingresos mensuales.",
      implementationPrice: 0,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 2,
      active: true,
      defaultSelected: false,
      timelineGroup: "admin",
      externalPlanKey: "electronicInvoice",
      highlights: ["Solo facturación", "Planes mensuales y anuales", "Tercero Alegra"]
    },
    {
      id: "dashboard",
      category: "Datos",
      name: "Dashboard gerencial",
      shortName: "Dashboard",
      description:
        "Vista ejecutiva para ventas, leads, conversión, canales, inventario, productos, clientes, recompra y tiempos de respuesta.",
      implementationPrice: 0,
      monthlyPrice: 0,
      annualPrice: 0,
      thirdPartyCost: 0,
      estimatedDays: 5,
      active: false,
      defaultSelected: false,
      timelineGroup: "data",
      highlights: ["Integrado en CRM", "No se cobra como módulo separado", "Base para decisiones"]
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
