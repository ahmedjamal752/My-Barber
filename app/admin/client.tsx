import CreateForm from "../../components/adminDashboard/CreateForm";
import { useAppStore } from "../../lib/store";

export default function AddClientScreen() {
  const { addClient } = useAppStore();

  const handleCreate = (values: Record<string, string>) => {
    addClient({
      name: values.name,
      phone: values.phone,
      email: values.email,
      notes: values.notes || "Ajouté depuis le panneau administrateur",
    });
  };

  return (
    <CreateForm
      title="Ajouter un nouveau client"
      subtitle="Enregistrer la fiche d'un client dans le fichier My Barber."
      buttonText="Enregistrer le client"
      onSubmitData={handleCreate}
      fields={[
        {
          name: "Nom complet du client",
          key: "name",
          placeholder: "Ex : Ahmed Benali",
        },
        {
          name: "Numéro de téléphone",
          key: "phone",
          placeholder: "+212 6XX XX XX XX",
          keyboardType: "phone-pad",
        },
        {
          name: "Adresse Email",
          key: "email",
          placeholder: "client@email.com",
          keyboardType: "email-address",
        },
        {
          name: "Remarques ou préférences (optionnel)",
          key: "notes",
          placeholder: "Ex : Coupe habituelle dégradé bas, peau sensible",
          defaultValue: "",
        },
      ]}
    />
  );
}
