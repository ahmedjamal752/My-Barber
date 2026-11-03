
import CreateForm from "../../components/adminDashboard/CreateForm";

export default function AddClientScreen() {
  return (
    <CreateForm
      title="Ajouter un client"
      subtitle="Enregistrer un nouveau client dans My Barber."
      buttonText="Enregistrer le client"
      fields={[
        {
          name: "Nom complet",
          placeholder: "Ex : Ahmed Benali",
        },
        {
          name: "Téléphone",
          placeholder: "+212 6XX XX XX XX",
          keyboardType: "phone-pad",
        },
        {
          name: "Email",
          placeholder: "client@email.com",
          keyboardType: "email-address",
        },
      ]}
    />
  );
}
