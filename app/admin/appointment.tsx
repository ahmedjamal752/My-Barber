
import CreateForm from "../../components/adminDashboard/CreateForm";

export default function AddAppointmentScreen() {
  return (
    <CreateForm
      title="Ajouter un rendez-vous"
      subtitle="Planifier un nouveau rendez-vous pour un client."
      buttonText="Confirmer le rendez-vous"
      fields={[
        {
          name: "Nom du client",
          placeholder: "Ex : Ahmed Benali",
        },
        {
          name: "Service",
          placeholder: "Ex : Coupe classique",
        },
        {
          name: "Date",
          placeholder: "YYYY-MM-DD",
        },
        {
          name: "Heure",
          placeholder: "Ex : 14:30",
        },
      ]}
    />
  );
}
