import { useState, useEffect } from "react";
import EbookHero from "@/components/sections/EbookHero";
import EbookBioSection from "@/components/sections/EbookBioSection";
import EbookOptinModal from "@/components/EbookOptinModal";

const EbookPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Ebook Grátis: Tarô do Zero em 7 Dias · Velvet Oráculo";
    return () => { document.title = "Curso de Tarot Online · Do Básico ao Avançado · Velvet Oráculo"; };
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-[#1F1530]">
      <EbookHero onOpenModal={openModal} />
      <EbookBioSection onOpenModal={openModal} />
      <EbookOptinModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default EbookPage;
