import { ReactNode } from 'react';

const AuthShell = ({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) => (
  <div className="min-h-screen grid lg:grid-cols-2 font-ptsans">
    <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-primary-dark to-primary p-12 text-white flex-col justify-between">
      <img src="/img/general/tech_car.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity" />
      <img src="/img/logo_bp_bw.png" alt="BridgePoint" className="relative h-12 w-auto self-start" />
      <div className="relative">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">Área reservada</p>
        <h2 className="mt-3 text-4xl font-bold font-montserrat text-white">Gestão de conteúdos do website</h2>
        <p className="mt-4 max-w-md text-white/80">Notícias, vagas, candidaturas e mensagens de contacto — tudo num só lugar.</p>
      </div>
      <p className="relative text-xs text-white/50">© {new Date().getFullYear()} BridgePoint</p>
    </div>
    <div className="flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm">
        <img src="/img/Logo_Bridgepoint_Header.png" alt="BridgePoint" className="mb-8 h-12 w-auto lg:hidden" />
        <h1 className="text-2xl font-bold font-montserrat text-gray-900">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </div>
  </div>
);

export default AuthShell;
