import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Service,
  Barber,
  Appointment,
  Client,
  INITIAL_SERVICES,
  INITIAL_BARBERS,
  INITIAL_APPOINTMENTS,
  INITIAL_CLIENTS,
} from "./mockData";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: "client" | "admin";
}

interface AppContextType {
  services: Service[];
  barbers: Barber[];
  appointments: Appointment[];
  clients: Client[];
  currentUser: UserProfile | null;
  addService: (newService: Omit<Service, "id">) => void;
  addClient: (newClient: Omit<Client, "id" | "appointmentsCount" | "lastVisit">) => void;
  addAppointment: (newAppointment: Omit<Appointment, "id">) => void;
  updateAppointmentStatus: (id: string, status: Appointment["status"]) => void;
  loginAs: (role: "client" | "admin", userDetails?: Partial<UserProfile>) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [barbers] = useState<Barber[]>(INITIAL_BARBERS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    name: "Ahmed Jamaleddine",
    email: "ahmed@barber.com",
    phone: "+212 612 345 678",
    role: "client",
  });

  const addService = (newService: Omit<Service, "id">) => {
    const id = `s-${Date.now()}`;
    setServices((prev) => [
      {
        id,
        ...newService,
      },
      ...prev,
    ]);
  };

  const addClient = (newClient: Omit<Client, "id" | "appointmentsCount" | "lastVisit">) => {
    const id = `c-${Date.now()}`;
    setClients((prev) => [
      {
        id,
        ...newClient,
        appointmentsCount: 0,
        lastVisit: "Nouveau",
      },
      ...prev,
    ]);
  };

  const addAppointment = (newAppointment: Omit<Appointment, "id">) => {
    const id = `apt-${Date.now()}`;
    const created: Appointment = {
      id,
      ...newAppointment,
    };
    setAppointments((prev) => [created, ...prev]);

    // Also update or add client appointments count
    setClients((prev) =>
      prev.map((c) =>
        c.name.toLowerCase() === newAppointment.clientName.toLowerCase()
          ? { ...c, appointmentsCount: c.appointmentsCount + 1, lastVisit: "Aujourd'hui" }
          : c
      )
    );
  };

  const updateAppointmentStatus = (id: string, status: Appointment["status"]) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  const loginAs = (role: "client" | "admin", userDetails?: Partial<UserProfile>) => {
    setCurrentUser({
      name: userDetails?.name || (role === "admin" ? "Karim Amrani (Admin)" : "Ahmed Jamaleddine"),
      email: userDetails?.email || (role === "admin" ? "admin@mybarber.ma" : "client@mybarber.ma"),
      phone: userDetails?.phone || "+212 612 345 678",
      role,
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        services,
        barbers,
        appointments,
        clients,
        currentUser,
        addService,
        addClient,
        addAppointment,
        updateAppointmentStatus,
        loginAs,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppStore must be used within an AppProvider");
  }
  return context;
}
