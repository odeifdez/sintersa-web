"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Shield,
  Sparkles,
  Sun,
  X
} from "lucide-react";

import {
  benefits,
  companyData,
  coverage,
  faqs,
  navLinks,
  processSteps,
  services,
  stats,
  testimonials
} from "@/lib/sintersa-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type CalculatorForm = {
  moveType: string;
  origin: string;
  destination: string;
  size: string;
  date: string;
  extras: string[];
  phone: string;
  email: string;
};

const moveTypes = ["Particular", "Oficina", "Urgente", "Nacional"];
const sizeOptions = ["Estudio", "Piso 2-3 habitaciones", "Vivienda grande", "Oficina +10 puestos"];
const extraOptions = ["Embalaje premium", "Montaje de muebles", "Guardamuebles", "Elevador exterior"];

export function SintersaLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [calcResult, setCalcResult] = useState<string>("");
  const [calcForm, setCalcForm] = useState<CalculatorForm>({
    moveType: "",
    origin: "",
    destination: "",
    size: "",
    date: "",
    extras: [],
    phone: "",
    email: ""
  });
  const [contactSuccess, setContactSuccess] = useState(false);

  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const darkMode = storedTheme ? storedTheme === "dark" : prefersDark;
    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-copy > *",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out"
        }
      );

      gsap.fromTo(
        ".hero-visual",
        { y: 22, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1, delay: 0.2, ease: "power3.out" }
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%"
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((container) => {
        const items = Array.from(container.children);
        gsap.fromTo(
          items,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%"
            }
          }
        );
      });

      gsap.to(".hero-orb", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.9
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((counter) => {
        const target = Number(counter.dataset.count ?? "0");
        const suffix = counter.dataset.suffix ?? "";
        const countObj = { value: 0 };

        gsap.to(countObj, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
            once: true
          },
          onUpdate: () => {
            counter.textContent = `${Math.round(countObj.value).toLocaleString("es-ES")}${suffix}`;
          }
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  const estimatedRange = useMemo(() => {
    if (!calcForm.size || !calcForm.moveType) return null;

    const baseBySize: Record<string, number> = {
      Estudio: 480,
      "Piso 2-3 habitaciones": 890,
      "Vivienda grande": 1380,
      "Oficina +10 puestos": 1690
    };

    const moveTypeFactor: Record<string, number> = {
      Particular: 1,
      Oficina: 1.18,
      Urgente: 1.24,
      Nacional: 1.35
    };

    const extraFee = calcForm.extras.length * 90;
    const result = (baseBySize[calcForm.size] ?? 800) * (moveTypeFactor[calcForm.moveType] ?? 1) + extraFee;

    return {
      min: Math.round(result * 0.9),
      max: Math.round(result * 1.14)
    };
  }, [calcForm]);

  function handleExtra(checked: boolean, item: string) {
    setCalcForm((prev) => ({
      ...prev,
      extras: checked ? [...prev.extras, item] : prev.extras.filter((entry) => entry !== item)
    }));
  }

  function handleCalculatorSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!estimatedRange) {
      setCalcResult("Completa tipo de mudanza y tamaño estimado para calcular un rango inicial.");
      return;
    }

    setCalcResult(
      `Estimación inicial entre ${estimatedRange.min.toLocaleString("es-ES")}€ y ${estimatedRange.max.toLocaleString(
        "es-ES"
      )}€. Te contactamos en menos de 24h con propuesta cerrada.`
    );
  }

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactSuccess(true);
  }

  return (
    <div className="relative overflow-hidden">
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div
          className={cn(
            "container flex items-center justify-between rounded-full border px-5 transition-all duration-300 md:px-8",
            scrolled
              ? "glass-panel border-border/80 py-3 shadow-soft"
              : "border-transparent bg-transparent py-2"
          )}
        >
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Sintersa
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/70 text-foreground transition hover:border-primary/40 hover:text-primary dark:bg-slate-900/70"
              aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Button asChild variant="outline">
              <a href="#calculadora">Generar presupuesto</a>
            </Button>
            <Button asChild>
              <a href="#contacto">Solicitar presupuesto</a>
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/70 text-foreground transition hover:border-primary/40 hover:text-primary dark:bg-slate-900/70"
              aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              className="rounded-full border border-border p-2 text-foreground"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Abrir menú"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="container mt-3 lg:hidden">
            <div className="glass-panel rounded-3xl border border-border p-5 shadow-soft">
              <nav className="grid gap-3 text-sm">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-2 py-1.5 text-muted-foreground hover:bg-accent"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      <main>
        <section ref={heroRef} className="container relative pt-36 md:pt-40">
          <div className="hero-orb absolute -left-10 top-16 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="hero-copy">
              <Badge className="mb-6">Mudanzas premium para hogar y empresa</Badge>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                Mudanzas de alto nivel con la precisión que esperas.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                En Sintersa combinamos planificación técnica, cuidado extremo de pertenencias y ejecución puntual para
                que mudarte sea una experiencia ordenada, segura y sin fricción.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#calculadora">
                    Generar presupuesto <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#contacto">Solicitar presupuesto</a>
                </Button>
              </div>
            </div>

            <Card className="hero-visual glass-panel relative overflow-hidden border-white/70 p-2 dark:border-white/10">
              <CardContent className="hero-grid-surface relative overflow-hidden rounded-[1.2rem] p-7 text-white sm:p-9">
                <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
                <Badge variant="secondary" className="mb-6 w-fit border-white/20 bg-white/15 text-white">
                  Operativa certificada y trazable
                </Badge>
                <h2 className="max-w-sm text-2xl font-semibold leading-tight sm:text-3xl">
                  Tu mudanza, coordinada al detalle desde la primera llamada.
                </h2>
                <div className="mt-8 grid gap-4 text-sm">
                  {[
                    "Asesor dedicado durante todo el servicio",
                    "Equipo propio especializado en embalaje técnico",
                    "Cobertura nacional con rutas semanales"
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-100" />
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div data-stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <Card key={item.label} className="glass-panel border-white/80 dark:border-white/10">
                <CardContent className="p-5">
                  <p data-count={item.value} data-suffix={item.suffix} className="text-3xl font-semibold tracking-tight">
                    0
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="servicios" className="container scroll-mt-28 py-24 md:scroll-mt-32" data-reveal>
          <SectionHeader
            overline="Servicios"
            title="Soluciones de mudanza diseñadas para máxima tranquilidad"
            description="Cada servicio combina logística precisa, materiales de calidad y una ejecución limpia de principio a fin."
          />
          <div data-stagger className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="glass-panel border-white/80 transition hover:-translate-y-0.5 dark:border-white/10">
                  <CardContent className="p-6">
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section id="por-que" className="container scroll-mt-28 pb-24 md:scroll-mt-32" data-reveal>
          <SectionHeader
            overline="Por qué Sintersa"
            title="Un estándar premium que se nota en cada detalle"
            description="La diferencia está en la metodología: previsión, control y una atención personal constante."
          />
          <div data-stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="border-white/80 bg-white/90 dark:border-white/10 dark:bg-slate-900/70">
                  <CardContent className="p-6">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section id="calculadora" className="container scroll-mt-28 pb-24 md:scroll-mt-32" data-reveal>
          <Card className="overflow-hidden border-white/80 bg-gradient-to-b from-white to-[#f4f8ff] dark:border-white/10 dark:from-slate-900 dark:to-slate-950">
            <CardContent className="p-7 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <Badge className="mb-5">Calculadora rápida</Badge>
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Genera una estimación inicial en menos de 1 minuto</h2>
                  <p className="mt-4 text-muted-foreground">
                    Simula tu mudanza y recibe un rango orientativo inmediato. Después te enviamos propuesta técnica y
                    económica cerrada.
                  </p>

                  <form onSubmit={handleCalculatorSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="calc-move-type">Tipo de mudanza</Label>
                      <Select
                        value={calcForm.moveType}
                        onValueChange={(value) => setCalcForm((prev) => ({ ...prev, moveType: value }))}
                      >
                        <SelectTrigger id="calc-move-type" className="mt-2">
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                        <SelectContent>
                          {moveTypes.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="calc-size">Tamaño estimado</Label>
                      <Select
                        value={calcForm.size}
                        onValueChange={(value) => setCalcForm((prev) => ({ ...prev, size: value }))}
                      >
                        <SelectTrigger id="calc-size" className="mt-2">
                          <SelectValue placeholder="Selecciona tamaño" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="calc-origin">Origen</Label>
                      <Input
                        id="calc-origin"
                        className="mt-2"
                        value={calcForm.origin}
                        onChange={(event) => setCalcForm((prev) => ({ ...prev, origin: event.target.value }))}
                        placeholder="Ej. Madrid centro"
                      />
                    </div>

                    <div>
                      <Label htmlFor="calc-destination">Destino</Label>
                      <Input
                        id="calc-destination"
                        className="mt-2"
                        value={calcForm.destination}
                        onChange={(event) => setCalcForm((prev) => ({ ...prev, destination: event.target.value }))}
                        placeholder="Ej. Pozuelo de Alarcón"
                      />
                    </div>

                    <div>
                      <Label htmlFor="calc-date">Fecha deseada</Label>
                      <Input
                        id="calc-date"
                        className="mt-2"
                        type="date"
                        value={calcForm.date}
                        onChange={(event) => setCalcForm((prev) => ({ ...prev, date: event.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="calc-phone">Teléfono</Label>
                      <Input
                        id="calc-phone"
                        className="mt-2"
                        value={calcForm.phone}
                        onChange={(event) => setCalcForm((prev) => ({ ...prev, phone: event.target.value }))}
                        placeholder="+34 600 000 000"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="calc-email">Email</Label>
                      <Input
                        id="calc-email"
                        className="mt-2"
                        type="email"
                        value={calcForm.email}
                        onChange={(event) => setCalcForm((prev) => ({ ...prev, email: event.target.value }))}
                        placeholder="nombre@empresa.com"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <p className="mb-2 text-sm font-medium">Servicios extra</p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {extraOptions.map((extra) => (
                          <label
                            key={extra}
                            className="flex items-center gap-3 rounded-xl border border-border bg-white px-3 py-2 text-sm dark:bg-slate-900/70"
                          >
                            <Checkbox
                              checked={calcForm.extras.includes(extra)}
                              onCheckedChange={(checked) => handleExtra(Boolean(checked), extra)}
                            />
                            {extra}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <Button type="submit" size="lg" className="w-full sm:w-auto">
                        Generar presupuesto
                      </Button>
                    </div>
                  </form>
                </div>

                <div className="relative rounded-[1.5rem] border border-primary/20 bg-[#0f3f9c] p-6 text-white md:p-8">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-200/20 blur-3xl" />
                  <p className="text-sm text-blue-100">Resultado orientativo</p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight">Estimación inteligente con revisión humana</h3>
                  <p className="mt-4 text-sm leading-6 text-blue-100/90">
                    Nuestra calculadora utiliza referencias históricas de rutas, volumen y servicios adicionales para
                    ofrecer un primer rango realista.
                  </p>

                  <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-widest text-blue-100">Vista previa</p>
                    <p className="mt-3 text-xl font-semibold">
                      {estimatedRange
                        ? `${estimatedRange.min.toLocaleString("es-ES")}€ - ${estimatedRange.max.toLocaleString("es-ES")}€`
                        : "Completa el formulario para calcular"}
                    </p>
                    <p className="mt-2 text-sm text-blue-100">
                      Incluye transporte, operarios y protección estándar. Ajustaremos al confirmar visita técnica.
                    </p>
                  </div>

                  <div className="mt-4 min-h-14 rounded-xl border border-white/15 bg-white/10 p-3 text-sm text-blue-50">
                    {calcResult || "Sintersa responde todas las solicitudes en menos de 24 horas laborales."}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="proceso" className="container scroll-mt-28 pb-24 md:scroll-mt-32" data-reveal>
          <SectionHeader
            overline="Proceso"
            title="Un flujo operativo claro de principio a fin"
            description="Sin improvisaciones: cada etapa está definida para garantizar tiempos, cuidado y trazabilidad."
          />
          <div data-stagger className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {processSteps.map((step, index) => (
              <Card key={step} className="relative border-white/80 bg-white/90 dark:border-white/10 dark:bg-slate-900/70">
                <CardContent className="p-6">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-base font-semibold leading-6">{step}</h3>
                  {index < processSteps.length - 1 && (
                    <ChevronRight className="mt-5 hidden h-4 w-4 text-muted-foreground xl:block" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container pb-24" data-reveal>
          <SectionHeader
            overline="Clientes"
            title="Testimonios reales de mudanzas exigentes"
            description="Hogares y empresas que priorizan seguridad, orden y cumplimiento de plazos."
          />
          <div data-stagger className="mt-10 grid gap-4 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-white/80 bg-white/90 dark:border-white/10 dark:bg-slate-900/70">
                <CardContent className="p-6">
                  <p className="text-sm leading-7 text-muted-foreground">“{testimonial.quote}”</p>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.city} · {testimonial.service}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="cobertura" className="container scroll-mt-28 pb-24 md:scroll-mt-32" data-reveal>
          <Card className="border-white/80 bg-white/90 dark:border-white/10 dark:bg-slate-900/70">
            <CardContent className="grid gap-8 p-7 md:grid-cols-[0.8fr_1.2fr] md:p-10">
              <div>
                <Badge className="mb-4">Cobertura</Badge>
                <h2 className="text-3xl font-semibold tracking-tight">Operativa directa en principales ciudades</h2>
                <p className="mt-4 text-muted-foreground">
                  Equipos propios en plazas estratégicas y red de coordinación para traslados nacionales de largo
                  recorrido.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {coverage.map((city) => (
                  <div
                    key={city}
                    className="rounded-xl border border-border bg-gradient-to-b from-white to-slate-50 px-4 py-4 text-sm font-medium dark:from-slate-900 dark:to-slate-800"
                  >
                    {city}
                  </div>
                ))}
                <div className="col-span-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-4 text-sm font-medium text-primary sm:col-span-3">
                  Traslados nacionales bajo planificación centralizada
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="faq" className="container scroll-mt-28 pb-24 md:scroll-mt-32" data-reveal>
          <SectionHeader
            overline="FAQ"
            title="Preguntas frecuentes"
            description="Respuestas claras para ayudarte a decidir con seguridad."
          />
          <Card className="mt-10 border-white/80 bg-white/90 dark:border-white/10 dark:bg-slate-900/70">
            <CardContent className="p-6 md:p-8">
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.q} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        <section id="contacto" className="container scroll-mt-28 pb-24 md:scroll-mt-32" data-reveal>
          <Card className="overflow-hidden border-white/80 bg-white/95 dark:border-white/10 dark:bg-slate-900/80">
            <CardContent className="grid gap-8 p-7 md:grid-cols-[0.9fr_1.1fr] md:p-10">
              <div>
                <Badge className="mb-4">Contacto</Badge>
                <h2 className="text-3xl font-semibold tracking-tight">Solicita tu presupuesto detallado</h2>
                <p className="mt-4 text-muted-foreground">
                  Cuéntanos tu caso y te enviaremos propuesta personalizada con planificación y precio cerrado.
                </p>

                <div className="mt-7 space-y-4 text-sm">
                  <InfoLine icon={Phone} text={companyData.phone} />
                  <InfoLine icon={Mail} text={companyData.email} />
                  <InfoLine icon={MapPin} text={companyData.address} />
                  <InfoLine icon={Shield} text="Cobertura de responsabilidad civil y opciones ampliadas" />
                </div>

                <Link href="/politica-empresa" className="mt-8 inline-flex items-center text-sm font-semibold text-primary">
                  Política de empresa <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <form onSubmit={handleContactSubmit} className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre y apellidos" id="name">
                  <Input id="name" name="name" required placeholder="Ej. Laura Ortega" />
                </Field>
                <Field label="Teléfono" id="phone">
                  <Input id="phone" name="phone" required placeholder="+34 600 000 000" />
                </Field>
                <Field label="Email" id="email">
                  <Input id="email" name="email" type="email" required placeholder="laura@email.com" />
                </Field>
                <Field label="Fecha aproximada" id="move-date">
                  <Input id="move-date" name="move-date" type="date" required />
                </Field>
                <Field label="Ciudad de origen" id="origin">
                  <Input id="origin" name="origin" required placeholder="Madrid" />
                </Field>
                <Field label="Ciudad de destino" id="destination">
                  <Input id="destination" name="destination" required placeholder="Valencia" />
                </Field>

                <Field label="Tipo de mudanza" id="move-kind">
                  <Select>
                    <SelectTrigger id="move-kind" aria-label="Tipo de mudanza" className="mt-2">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="particular">Particular</SelectItem>
                      <SelectItem value="oficina">Oficina</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                      <SelectItem value="nacional">Nacional</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Tamaño aproximado" id="move-volume">
                  <Select>
                    <SelectTrigger id="move-volume" aria-label="Tamaño aproximado" className="mt-2">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Pequeña</SelectItem>
                      <SelectItem value="medium">Mediana</SelectItem>
                      <SelectItem value="large">Grande</SelectItem>
                      <SelectItem value="xlarge">Muy grande</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <div className="sm:col-span-2">
                  <p className="mb-2 text-sm font-medium">Servicios extra</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {extraOptions.map((extra) => (
                      <label
                        key={extra}
                        className="flex items-center gap-3 rounded-xl border border-border bg-white px-3 py-2 text-sm dark:bg-slate-900/70"
                      >
                        <Checkbox name="extras" value={extra} />
                        {extra}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="message">Mensaje adicional</Label>
                  <Textarea
                    id="message"
                    name="message"
                    className="mt-2"
                    placeholder="Accesos, ascensor, piezas delicadas, horario preferido..."
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button type="submit" size="lg">
                    Solicitar presupuesto
                  </Button>
                  <p className="text-xs text-muted-foreground">Al enviar, aceptas el tratamiento de datos para gestionar tu solicitud.</p>
                </div>

                {contactSuccess && (
                  <div className="sm:col-span-2 rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm text-primary">
                    Solicitud enviada correctamente. Te contactaremos en menos de 24 horas laborales.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/80 bg-white/80 py-12 backdrop-blur-sm dark:bg-slate-950/70">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xl font-semibold tracking-tight">Sintersa</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Mudanzas profesionales de alto nivel para clientes particulares y corporativos.
            </p>
            <div className="mt-5 flex items-center gap-2 text-muted-foreground">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/company/sintersa-logistica" },
                { icon: Instagram, href: "https://www.instagram.com/sintersa.es" },
                { icon: Facebook, href: "https://www.facebook.com/sintersa.es" }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="rounded-full border border-border p-2 transition hover:border-primary/40 hover:text-primary"
                  aria-label="Red social"
                  target="_blank"
                  rel="noreferrer"
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-semibold text-foreground">Contacto</p>
            <p className="text-muted-foreground">{companyData.phone}</p>
            <p className="text-muted-foreground">{companyData.email}</p>
            <p className="text-muted-foreground">{companyData.address}</p>
            <p className="text-muted-foreground">{companyData.hours}</p>
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-semibold text-foreground">Enlaces rápidos</p>
            {navLinks.slice(0, 4).map((item) => (
              <a key={item.href} href={item.href} className="block text-muted-foreground transition hover:text-primary">
                {item.label}
              </a>
            ))}
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-semibold text-foreground">Legal</p>
            <Link href="/politica-empresa" className="block text-muted-foreground transition hover:text-primary">
              Política de empresa
            </Link>
            <Link href="/privacidad" className="block text-muted-foreground transition hover:text-primary">
              Política de privacidad
            </Link>
            <Link href="/aviso-legal" className="block text-muted-foreground transition hover:text-primary">
              Aviso legal
            </Link>
          </div>
        </div>
        <div className="container mt-10 border-t border-border/70 pt-5 text-xs text-muted-foreground">
          © {year} {companyData.legalName} · {companyData.nif}. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({
  overline,
  title,
  description
}: {
  overline: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
        <Sparkles className="h-3 w-3" />
        {overline}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      <p className="mt-4 text-muted-foreground md:text-lg">{description}</p>
    </div>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function InfoLine({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-muted-foreground">{text}</span>
    </div>
  );
}
