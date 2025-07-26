export default function ComingSoon() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="bg-blue-200 text-black w-1/2 p-5 pb-10 rounded-2xl flex flex-col items-center">
        <img src="/logo.png" alt="Logo Perfilfy" className="w-3xs mb-6" />
        <h1 className="text-6xl text-center font-black uppercase mb-3">
          A Perfilfy está chegando!
        </h1>
        <h2 className="font-bold text-2xl text-center mb-4">
          Uma nova era para a presença digital dos Peritos Judiciais
        </h2>
        <p className="text-center text-[18px] mb-4">
          Estamos preparando uma plataforma simples, eficiente e moderna para
          que
          <strong className="text-blue-800">
            Peritos e Assistentes Técnicos
          </strong>
          tenham seu perfil profissional online em poucos minutos.
        </p>
        <p className="text-center text-[18px]">
          Com a <strong className="text-blue-800">Perfilfy</strong>, você poderá
          compartilhar seus contatos, certificações, áreas de atuação e canais
          de atendimento — tudo em uma{" "}
          <strong className="text-blue-800">mini página personalizada</strong>,
          otimizada e com aparência profissional.
        </p>
      </div>
    </div>
  );
}
