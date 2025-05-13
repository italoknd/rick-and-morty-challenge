import { Notify } from "quasar";

export default {
  methods: {
    showSuccessNotification(message: string) {
      Notify.create({
        message,
        color: "green",
        position: "top-right",
        timeout: 2000,
        icon: "check_circle", // Ícone de sucesso
      });
    },

    showErrorNotification(message: string) {
      Notify.create({
        message,
        color: "red",
        position: "top-right",
        timeout: 2000,
        icon: "error",
      });
    },
  },
};
