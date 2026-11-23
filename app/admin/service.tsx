import CreateForm from "../../components/adminDashboard/CreateForm";
import { useAppStore } from "../../lib/store";

export default function AddServiceScreen() {
  const { addService } = useAppStore();

  const handleCreate = (values: Record<string, string>) => {
    addService({
      name: values.name,
      category: (values.category as any) || "Coupe",
      price: parseFloat(values.price) || 80,
      duration: parseInt(values.duration, 10) || 30,
      description: values.description || "Prestation réalisée avec soin par nos barbiers professionnels.",
      iconName: "cut-outline",
      popular: false,
    });
  };

  return (
    <CreateForm
      title="Ajouter une prestation"
      subtitle="Proposer un nouveau service sur l'application et au salon."
      buttonText="Enregistrer la prestation"
      onSubmitData={handleCreate}
      fields={[
        {
          name: "Nom du service",
          key: "name",
          placeholder: "Ex : Soin barbe à l'huile d'argan",
        },
        {
          name: "Catégorie (Coupe, Barbe, Soin, Combo)",
          key: "category",
          placeholder: "Ex : Coupe",
          defaultValue: "Coupe",
        },
        {
          name: "Prix (en DH)",
          key: "price",
          placeholder: "Ex : 90",
          keyboardType: "numeric",
        },
        {
          name: "Durée estimée (en minutes)",
          key: "duration",
          placeholder: "Ex : 35",
          keyboardType: "numeric",
        },
        {
          name: "Description détaillée",
          key: "description",
          placeholder: "Détails de la prestation, produits utilisés...",
          defaultValue: "",
        },
      ]}
    />
  );
}
