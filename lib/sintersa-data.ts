import {
  Boxes,
  BriefcaseBusiness,
  Clock3,
  MapPinned,
  PackageCheck,
  ShieldCheck,
  Sofa,
  Truck,
  UserCheck,
  Warehouse,
  Wrench,
  Zap
} from "lucide-react";

export const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Ventajas", href: "#por-que" },
  { label: "Proceso", href: "#proceso" },
  { label: "Cobertura", href: "#cobertura" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" }
];

export const stats = [
  { value: 4850, suffix: "+", label: "mudanzas completadas" },
  { value: 24, suffix: "h", label: "respuesta media comercial" },
  { value: 98, suffix: "%", label: "clientes satisfechos" },
  { value: 6, suffix: " ciudades", label: "cobertura directa" }
];

export const services = [
  {
    icon: Sofa,
    title: "Mudanzas particulares",
    description:
      "Gestión integral para viviendas con embalaje por estancias, etiquetado y entrega ordenada en destino."
  },
  {
    icon: BriefcaseBusiness,
    title: "Mudanzas de oficinas",
    description:
      "Planificación por fases para minimizar la parada operativa de tu equipo y proteger material crítico."
  },
  {
    icon: PackageCheck,
    title: "Embalaje profesional",
    description:
      "Materiales premium multicapa, protección antiimpacto y protocolos específicos para piezas delicadas."
  },
  {
    icon: Wrench,
    title: "Montaje de mobiliario",
    description:
      "Desmontaje y montaje técnico de mobiliario, luminarias y estaciones de trabajo con ajuste final."
  },
  {
    icon: Warehouse,
    title: "Guardamuebles seguro",
    description:
      "Espacios vigilados 24/7, control de humedad y acceso programado para estancias cortas o largas."
  },
  {
    icon: Zap,
    title: "Mudanzas urgentes",
    description:
      "Operativa rápida en ventanas de 24 a 72 horas con equipo dedicado y seguimiento continuo."
  },
  {
    icon: Truck,
    title: "Traslados nacionales",
    description:
      "Rutas semanales entre principales capitales con trazabilidad y coordinación puerta a puerta."
  }
];

export const benefits = [
  {
    icon: Clock3,
    title: "Puntualidad garantizada",
    text: "Ventanas horarias cerradas y confirmación activa 24 horas antes de cada servicio."
  },
  {
    icon: ShieldCheck,
    title: "Cuidado extremo",
    text: "Protocolos de manipulación premium para mobiliario de diseño, arte y equipos sensibles."
  },
  {
    icon: UserCheck,
    title: "Equipo especializado",
    text: "Personal propio formado en logística urbana, elevación y embalaje técnico."
  },
  {
    icon: Boxes,
    title: "Presupuesto claro",
    text: "Sin sorpresas: desglose por fases, extras opcionales y condiciones transparentes."
  },
  {
    icon: MapPinned,
    title: "Seguimiento continuo",
    text: "Canal directo con asesor dedicado y actualizaciones de estado durante toda la mudanza."
  },
  {
    icon: PackageCheck,
    title: "Material premium",
    text: "Cajas reforzadas, mantas térmicas, fundas transpirables y precintos de seguridad."
  }
];

export const processSteps = [
  "Solicitas presupuesto",
  "Analizamos la mudanza",
  "Confirmamos planificación",
  "Embalamos y trasladamos",
  "Entrega final y seguimiento"
];

export const testimonials = [
  {
    quote:
      "Coordinación impecable, trato excelente y cero incidencias. Se nota una empresa muy bien organizada.",
    name: "Paula Méndez",
    city: "Madrid",
    service: "Mudanza particular premium"
  },
  {
    quote:
      "Trasladamos nuestra oficina en una jornada y al día siguiente estábamos operativos al 100%.",
    name: "Álvaro Sanz",
    city: "Barcelona",
    service: "Mudanza corporativa"
  },
  {
    quote:
      "Nos ayudaron con mobiliario delicado y obra gráfica. Cuidado y precisión de nivel altísimo.",
    name: "Lucía Benet",
    city: "Valencia",
    service: "Traslado de piezas delicadas"
  }
];

export const coverage = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Zaragoza"];

export const faqs = [
  {
    q: "¿Cuánto cuesta una mudanza con Sintersa?",
    a: "Depende del volumen, acceso a las viviendas, distancia y servicios extra. Nuestros presupuestos se entregan detallados y sin costes ocultos."
  },
  {
    q: "¿Con cuánta antelación conviene reservar?",
    a: "Recomendamos entre 7 y 15 días para asegurar la franja deseada. Para mudanzas urgentes, activamos disponibilidad prioritaria en 24-72 horas."
  },
  {
    q: "¿Desmontáis y montáis muebles?",
    a: "Sí. Incluimos servicio técnico de desmontaje y montaje para mobiliario doméstico y de oficina con revisión final de estabilidad."
  },
  {
    q: "¿Ofrecéis embalaje profesional?",
    a: "Sí, con materiales premium y protocolos por tipo de objeto: vajilla, electrónica, textiles, cuadros y piezas frágiles."
  },
  {
    q: "¿Incluye seguro la mudanza?",
    a: "Todas las operaciones incluyen cobertura de responsabilidad civil y opciones de ampliación para objetos de alto valor declarado."
  },
  {
    q: "¿Realizáis mudanzas nacionales?",
    a: "Sí, operamos rutas periódicas en toda España con coordinación de origen y destino desde un único gestor."
  }
];

export const companyData = {
  phone: "+34 91 845 27 90",
  email: "presupuestos@sintersa.es",
  address: "Calle Julián Camarillo 42, 28037 Madrid",
  hours: "Lunes a viernes de 08:00 a 20:00 · Sábados de 09:00 a 14:00",
  legalName: "Sintersa Logística Premium S.L.",
  nif: "B-86473921"
};
