import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { companyData } from "@/lib/sintersa-data";

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Política de privacidad</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {companyData.legalName} trata la información personal con medidas técnicas y organizativas adecuadas para
            proteger la confidencialidad, integridad y disponibilidad de los datos.
          </p>

          <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground">1. Datos que recopilamos</h2>
              <p>
                Datos de contacto, detalles de la mudanza, direcciones de origen y destino, y observaciones logísticas
                necesarias para elaborar presupuestos y ejecutar servicios.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">2. Finalidad</h2>
              <p>
                Gestionar solicitudes comerciales, preparar propuestas, coordinar servicios contratados y atender
                consultas posteriores relacionadas con la operación.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">3. Conservación</h2>
              <p>
                Conservamos los datos durante el plazo necesario para la relación comercial y obligaciones legales
                aplicables, aplicando procesos de revisión periódica.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">4. Cesiones</h2>
              <p>
                No cedemos información a terceros salvo obligación legal o necesidad operativa estrictamente vinculada a
                la prestación del servicio contratado.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">5. Derechos</h2>
              <p>
                Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición y limitación escribiendo a
                <span className="font-medium text-foreground"> {companyData.email}</span>.
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
