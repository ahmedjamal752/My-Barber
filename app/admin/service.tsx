
import CreateForm from "../../components/adminDashboard/CreateForm";

export default function AddServiceScreen() {
  return (
    <CreateForm
      title="Ajouter un service"
      subtitle="Ajouter une nouvelle prestation à votre barber shop."
      buttonText="Enregistrer le service"
      fields={[
        {
          name: "Nom du service",
          placeholder: "Ex : Coupe classique",
        },
        {
          name: "Prix (DH)",
          placeholder: "Ex : 80",
          keyboardType: "numeric",
        },
        {
          name: "Durée (minutes)",
          placeholder: "Ex : 30",
          keyboardType: "numeric",
        },
      ]}
    />
  );
}
