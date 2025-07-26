import Link from "next/link";

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
          que <strong className="text-blue-800">
            Peritos e Assistentes Técnicos 
          </strong> tenham seu perfil profissional online em poucos minutos.
        </p>
        <p className="text-center text-[18px] mb-7">
          Com a <strong className="text-blue-800">Perfilfy</strong>, você poderá
          compartilhar seus contatos, certificações, áreas de atuação e canais
          de atendimento — tudo em uma{" "}
          <strong className="text-blue-800">mini página personalizada</strong>,
          otimizada e com aparência profissional.
        </p>
        <Link className="p-4 px-8 bg-blue-600 text-white font-bold text-2xl rounded-4xl hover:bg-blue-800" href="mailto:jkneto.jcn@gmail.com?subject=Interesse%20na%20plataforma%20Perfilfy&body=Ol%C3%A1%2C%20tudo%20bem%3F%0A%0AVi%20a%20p%C3%A1gina%20da%20Perfilfy%20e%20tenho%20interesse%20em%20saber%20mais%20sobre%20o%20lan%C3%A7amento%20da%20plataforma.%0AGostaria%20de%20ser%20avisado%20quando%20estiver%20dispon%C3%ADvel%20ou%2C%20se%20poss%C3%ADvel%2C%20participar%20dos%20testes%20iniciais.%0A%0AAguardo%20novidades!%0AObrigado(a)!">
          Quero saber mais
        </Link>
      </div>
    </div>
  );
}
