import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { companyData } from "@/lib/sintersa-data";

export default function PolicyPage() {
  return (
    <main className="min-h-screen py-16">
      <div className="container max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a inicio
        </Link>
        <article className="glass-panel rounded-[1.75rem] border border-border/80 p-8 shadow-soft md:p-12">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Política de empresa</h1>
          <p className="mt-4 text-muted-foreground">
            En {companyData.legalName} trabajamos con un estándar operativo orientado a seguridad, transparencia y
            excelencia de servicio.
          </p>

          <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground">1. Compromiso de puntualidad</h2>
              <p>
                Establecemos ventanas horarias concretas, confirmamos agenda el día previo y notificamos cualquier
                ajuste con antelación suficiente. Nuestro objetivo es minimizar la incertidumbre del cliente.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">2. Cuidado de pertenencias</h2>
              <p>
                Aplicamos protocolos de embalaje técnico, manipulación asistida y trazabilidad por bultos para proteger
                mobiliario, equipos electrónicos y objetos frágiles durante todas las fases.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">3. Transparencia comercial</h2>
              <p>
                Los presupuestos incluyen desglose de servicios, condiciones de ejecución y costes adicionales
                opcionales. No aplicamos cargos no informados previamente.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">4. Atención al cliente</h2>
              <p>
                Cada operación cuenta con un asesor de referencia para resolver dudas antes, durante y después de la
                mudanza. El seguimiento se realiza por teléfono y correo electrónico.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">5. Seguridad y responsabilidad</h2>
              <p>
                Operamos con personal cualificado, vehículos revisados y cobertura de responsabilidad civil vigente,
                con opciones de ampliación para elementos de alto valor declarado.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">6. Privacidad</h2>
              <p>
                Tratamos los datos personales conforme a normativa vigente y exclusivamente para la gestión del
                servicio, presupuestos y comunicaciones contractuales.
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
