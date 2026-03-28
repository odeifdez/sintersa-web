import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { companyData } from "@/lib/sintersa-data";

export default function LegalNoticePage() {
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
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Aviso legal</h1>
          <div className="mt-8 space-y-8 text-sm leading-7 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground">Titular del sitio</h2>
              <p>
                {companyData.legalName} · NIF {companyData.nif}
                <br />
                Domicilio: {companyData.address}
                <br />
                Contacto: {companyData.email} · {companyData.phone}
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">Condiciones de uso</h2>
              <p>
                El acceso y uso de esta web implica la aceptación de las condiciones aquí descritas. El usuario se
                compromete a utilizar los contenidos de forma lícita y respetuosa.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">Propiedad intelectual</h2>
              <p>
                Los contenidos, diseño, textos, marca e identidad visual de Sintersa están protegidos y no pueden
                reproducirse sin autorización expresa.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">Responsabilidad</h2>
              <p>
                Sintersa no se hace responsable de interrupciones del servicio web derivadas de incidencias técnicas
                ajenas, fuerza mayor o mantenimiento planificado.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">Legislación aplicable</h2>
              <p>
                Este sitio se rige por la normativa española. Para cualquier controversia, las partes se someten a los
                juzgados y tribunales de Madrid.
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
