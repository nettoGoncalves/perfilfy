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
        "O Perfilfy é uma plataforma que permite criar uma página profissional com um link personalizado. Nela, você pode exibir seus projetos, serviços, redes sociais e contar com estatísticas de cliques em cada item.",
    },
    {
      title: "O Perfilfy oferece um período de teste gratuito?",
      description:
        "Sim! Você pode testar todos os recursos da plataforma gratuitamente por 3 dias antes de decidir pela assinatura.",
    },
    {
      title: "Consigo personalizar minha página?",
      description:
        "Sim! Você pode personalizar o título da sua página, adicionar seus projetos, redes sociais e escolher o identificador do seu link personalizado.",
    },
    {
      title: "Preciso saber programar para usar o Perfilfy?",
      description:
        "Não! O Perfilfy foi criado para ser fácil de usar. Basta preencher seus dados e escolher o que deseja exibir — sem precisar entender nada de código.",
    },
    {
      title: "O que acontece se eu cancelar minha assinatura?",
      description:
        "Você poderá usar todos os recursos normalmente até o fim do seu período pago. Após esse prazo, sua página será desativada e ficará indisponível para visualização.",
    },
    {
      title: "Posso compartilhar minha página do Perfilfy?",
      description:
        "Sim! Sua página tem um link exclusivo e personalizado, pronto para ser compartilhado em redes sociais, currículos e propostas.",
    },
  ];

  return (
    <section className="pb-[120px]">
      <h2 className="text-accent-blue font-bold mb-6 text-center text-4xl">Dúvidas Frequentes</h2>
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
