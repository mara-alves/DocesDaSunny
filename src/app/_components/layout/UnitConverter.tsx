import { useState } from "react";
import ComboSingle from "../inputs/ComboSingle";
import InputNumber from "../inputs/InputNumber";

export default function UnitConverter() {
  const [quantity, setQuantity] = useState<number>(0);
  const [selected, setSelected] = useState<string>("");

  return (
    <>
      <div className="flex w-full flex-row items-center gap-2">
        <InputNumber value={quantity} setValue={setQuantity} />
        Cups de
      </div>
      <ComboSingle
        options={Object.keys(options).map((e) => ({ name: e }))}
        value={{ name: selected }}
        setValue={(e) => setSelected(e?.name ?? "")}
      />
      <div className="bg-base-content h-0.5 w-full" />
      <span className="ml-auto text-xl font-semibold">
        {"= " +
          (options[selected]
            ? (options[selected][1] * quantity) / options[selected][0]
            : 0) +
          " Gramas"}
      </span>
    </>
  );
}

// Name, Cups, Grams
const options: Record<string, [number, number]> = {
  "Farinha '00' para Pizza": [1, 116],
  "Xarope de Agave": [0.5, 84],
  "Mistura para Bolos Multiusos": [1, 120],
  "Farinha Multiusos": [1, 120],
  "Manteiga de Amêndoa": [0.5, 68],
  "Farinha de Amêndoa": [0.75, 96],
  "Farinha de Amêndoa Moída": [0.5, 84],
  "Pasta de Amêndoa (Compactada)": [1.5, 259],
  "Amêndoas (Fatiadas)": [0.5, 43],
  "Amêndoas (Lasca)": [0.5, 57],
  "Amêndoas Inteiras (com Casca)": [1, 142],
  "Farinha de Amaranto": [0.75, 103],
  "Concentrado de Sumo de Maçã": [0.33, 70],
  "Maçãs (Secas e Cortadas)": [0.5, 85],
  "Maçãs (Descascadas e Fatiadas)": [0.5, 113],
  "Purê de Maçã": [1, 255],
  "Alperces (Secas e Cortadas)": [0.5, 64],
  "Farinha para Pão Artesanal": [1, 120],
  "Cobertura para Pão Artesanal": [0.25, 43],
  "Recheio de Canela para Padeiro": [0.5, 152],
  "Mistura de Frutas para Padeiro": [0.5, 128],
  "Açúcar Fino para Padeiro (Açúcar Superfino, Açúcar de Confeiteiro)": [
    1, 190,
  ],
  "Fermento em Pó": [0.03, 4],
  "Bicarbonato de Sódio": [0.02, 3],
  "Adoçante para Bolos": [1, 170],
  "Bananas (Amassadas)": [1, 227],
  "Cevada Cozida": [1, 215],
  "Cevada Perlada": [1, 213],
  "Flocos de Cevada": [0.5, 46],
  "Farinha de Cevada": [0.75, 85],
  "Xarope de Malte de Cevada": [0.25, 42],
  "Pesto de Manjericão": [0.125, 28],
  "Pimentos (Frescos)": [1, 142],
  "Frutos Vermelhos (Congelados)": [1, 142],
  "Pó de Queijo Cheddar Melhorado": [0.25, 57],
  "Mirtilos (Secos)": [1, 156],
  "Mirtilos (Frescos ou Congelados)": [0.75, 140],
  "Sumo de Mirtilo": [1, 241],
  "Sidra Cozida": [0.33, 85],
  "Cereal de Farelo": [0.5, 60],
  "Farinha de Pão Ralado (Seca)": [0.125, 28],
  "Farinha de Pão Ralado (Fresca)": [0.125, 21],
  "Pão Ralado Japonês Panko": [0.25, 50],
  "Farinha para Pão": [1, 120],
  "Arroz Integral Cozido": [1, 170],
  "Farinha de Arroz Integral": [0.75, 128],
  "Açúcar Mascavado (Escuro ou Claro, Compactado)": [1, 213],
  "Trigo Sarraceno Inteiro": [1, 170],
  "Farinha de Trigo Sarraceno": [1, 120],
  Bulgur: [1, 152],
  Manteiga: [0.5, 113],
  Leitelho: [1, 227],
  "Mistura para Bolachas com Leitelho": [0.75, 110],
  "Leite em Pó com Leitelho": [0.125, 18],
  "Nibs de Cacau": [0.75, 120],
  "Melhorador para Bolos": [0.05, 14],
  "Casca de Limão Cristalizada": [0.25, 37],
  "Casca de Laranja Cristalizada": [0.125, 25],
  'Caramelo (14-16 Pedaços Individuais, Quadrados de 1")': [1, 142],
  "Pedaços de Caramelo ou Toffee Picados": [1, 156],
  "Sementes de Alcaravia": [0.125, 18],
  "Cenouras (Cozidas e Puré)": [0.5, 128],
  "Cenouras (Cortadas)": [1, 142],
  "Cenouras (Raladas)": [0.5, 99],
  "Cajus (Picados)": [0.75, 113],
  "Cajus (Inteiros)": [0.75, 113],
  "Aipo (Cortado)": [1, 142],
  "Queijo Feta": [0.25, 57],
  "Queijo Ralado Cheddar, Jack, Mozzarella ou Suíço": [0.5, 113],
  "Queijo Ralado Parmesão": [0.25, 50],
  "Queijo Ricota": [1, 227],
  "Cerejas Cristalizadas": [0.25, 50],
  "Cerejas Secas": [0.33, 71],
  "Cerejas Frescas (Descaroçadas e Picadas)": [0.33, 80],
  "Cerejas Congeladas": [0.5, 113],
  "Concentrado de Cereja": [0.25, 42],
  "Sementes de Chia": [0.125, 37],
  "Farinha de Grão-de-Bico": [0.75, 85],
  "Cebolinho Fresco": [0.125, 21],
  "Chocolate Picado": [1, 170],
  "Gotas de Chocolate": [1, 170],
  "Pedaços de Chocolate": [1, 170],
  "Mistura para Mousse de Chocolate": [0.125, 28],
  "Pedaços Doces de Canela": [0.25, 35],
  "Açúcar com Canela": [0.25, 50],
  "Farinha Climate Blend": [1, 115],
  "Cacau em Pó (Não Adoçado)": [0.25, 42],
  "Coco Ralado Adoçado": [0.75, 85],
  "Coco Torrado": [0.75, 85],
  "Coco Desidratado sem Açúcar": [0.75, 85],
  "Flocos Grandes de Coco sem Açúcar": [0.5, 60],
  "Coco Ralado sem Açúcar": [0.5, 53],
  "Creme de Coco sem Açúcar": [1.25, 284],
  "Farinha de Coco": [0.75, 128],
  "Leite de Coco Enlatado, Bem Agitado": [1, 241],
  "Leite de Coco Evaporado": [1, 242],
  "Leite de Coco em Pó": [0.25, 57],
  "Óleo de Coco": [0.5, 113],
  "Açúcar de Coco": [0.33, 77],
  "Açúcar em Pó (Não Peneirado)": [1, 227],
  "Manteiga de Bolacha": [0.33, 72],
  "Biscoitos Esmagados": [0.75, 85],
  "Milho (Fresco ou Congelado)": [0.25, 38],
  "Milho Estourado": [0.125, 21],
  "Xarope de Milho": [1.25, 312],
  "Fubá (Integral)": [1, 138],
  "Fubá Amarelo (Quaker)": [1, 156],
  "Amido de Milho": [0.125, 28],
  "Queijo Cottage": [0.5, 113],
  "Trigo Partido": [1, 149],
  "Oxicoco Seco": [0.25, 57],
  "Oxicoco Fresco ou Congelado": [0.5, 99],
  "Natas (Nata Espessa, Nata Ligeira ou Meio-Gordo)": [1, 227],
  "Queijo Creme": [1, 227],
  "Creme de Coco": [0.5, 142],
  "Crème Fraîche": [0.5, 124],
  "Gengibre Cristalizado": [0.75, 92],
  Groselhas: [1, 142],
  "Tâmaras (Picadas)": [1, 149],
  "Açúcar Demerara": [1, 220],
  "Pó de Mirtilo Seco": [0.125, 28],
  "Leite Seco para Padeiro": [0.125, 28],
  "Leite Magro Seco em Pó": [0.125, 28],
  "Flocos de Batata Seca (Puré Instantâneo)": [0.25, 43],
  "Leite Seco Integral": [0.25, 50],
  "Farinha de Sêmola": [0.75, 124],
  "Melhorador para Massa Fácil": [0.05, 18],
  "Ovo Fresco": [0.25, 50],
  "Clara de Ovo Fresca": [0.1875, 30],
};
