import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqItems = [
    {
      title: "O que é o Perfilfy e como ele funciona?",
      description:
        "O Perfilfy é um cartão de visitas digital criado para fortalecer sua presença profissional. Você monta seu perfil com suas informações mais importantes e compartilha um link personalizado sempre que quiser causar uma boa primeira impressão.",
    },
    {
      title: "Preciso de um site tradicional para usar o Perfilfy?",
      description:
        "Não. O Perfilfy surgiu justamente como alternativa aos sites tradicionais. É mais simples, direto ao ponto e pensado para profissionais que querem ser encontrados com credibilidade, sem precisar manter um site completo.",
    },
    {
      title: "Quem pode se beneficiar do Perfilfy?",
      description:
        "Profissionais que precisam ser encontrados com confiança — como peritos, assistentes técnicos, contadores, consultores, advogados, autônomos e liberais em geral. Especialmente útil para quem recebe indicações e quer causar uma boa impressão logo na primeira busca.",
    },
    {
      title: "Consigo editar as informações do meu cartão de visitas?",
      description:
        "Sim! Você pode atualizar sua biografia, áreas de atuação, contatos, documentos e redes sociais a qualquer momento — de forma simples e rápida.",
    },
    {
      title: "É necessário saber mexer com tecnologia?",
      description:
        "De forma alguma. O Perfilfy foi feito para ser acessível até para quem não tem familiaridade com ferramentas digitais. Em poucos minutos você já tem seu cartão pronto para usar.",
    },
    {
      title: "Como posso usar meu link do Perfilfy?",
      description:
        "Você pode colocar seu link na bio das redes sociais, assinatura de e-mail, currículo, cartão de visitas impresso, QR Code ou até mesmo enviá-lo diretamente para contatos e parceiros.",
    },
  ];

  return (
    <section className="pb-[120px]">
      <h2 className="text-accent-blue font-bold mb-6 text-center text-4xl">
        Dúvidas Frequentes
      </h2>
      <Accordion type="single" collapsible>
        {faqItems.map((item) => (
          <AccordionItem key={item.title} value={item.title}>
            <AccordionTrigger className="text-accent-blue-dark">
              {item.title}
            </AccordionTrigger>
            <AccordionContent>{item.description}</AccordionContent>
          </AccordionItem>
        ))}
        <AccordionItem value="item-1"></AccordionItem>
      </Accordion>
    </section>
  );
}
