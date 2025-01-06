import { Component } from '@angular/core';
import * as emailjs from '@emailjs/browser';

declare var bootstrap: any; // Necesario para inicializar el Modal

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contact = { name: '', email: '', message: '' };
  loading = false;
  success = false;
  error = false;

  sendMessage() {
    if (this.contact.name && this.contact.email && this.contact.message) {
      this.loading = true; 
      const serviceID = "service_axwbjmj";
      const templateID = "template_omgh6wr";
      const publicKey = "QjSio-E5bUI_xyGzA";

      const templateParams = {
        from_name: this.contact.name,
        to_name: "Adam Diaz",
        from_email: this.contact.email,
        message: this.contact.message,
        reply_to: this.contact.email
      };

      emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then(() => {
          this.success = true;
          this.loading = false;
          this.contact = { name: '', email: '', message: '' };

          setTimeout(() => {
            let successToast = document.getElementById('successToast');
            if (successToast) new bootstrap.Toast(successToast).show();
          }, 200);

          setTimeout(() => this.success = false, 5000);
        })
        .catch(() => {
          this.error = true;
          this.loading = false;

          setTimeout(() => {
            let errorToast = document.getElementById('errorToast');
            if (errorToast) new bootstrap.Toast(errorToast).show();
          }, 200);

          setTimeout(() => this.error = false, 5000);
        });
    } else {
      // Mostrar el Modal si faltan campos
      let warningModal = new bootstrap.Modal(document.getElementById('warningModal'));
      warningModal.show();
    }
  }
}
