import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('image-converter');
  selectedImage: string | null = null;
  customFileName: string = '';
  constructor() {
    console.log('App component initialized');
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      // This runs once the file is fully loaded
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result; // This is our Data URL
        console.log('Image loaded successfully!', !this.selectedImage);
      };

      reader.readAsDataURL(file);
    }
  }
  //v1
  // convertToPdf() {
  //   // PDF generation logic goes hereif (this.selectedImage) {
  //   // 1. Create the PDF (default is A4 size)
  //   const doc = new jsPDF();

  //   // 2. Add the image 
  //   // Arguments: (data, format, x, y, width, height)
  //   doc.addImage(this.selectedImage!, 'PNG', 0, 0, 210, 297); 

  //   // 3. Download the file
  //   doc.save('converted-image.pdf');
  
  // }
  // v2 - optimizedconsole.log('Image loaded successfully!', this.selectedImage);
  convertToPdf() {
  if (!this.selectedImage) return;

  const img = new Image();
  img.src = this.selectedImage;

  img.onload = () => {
    const doc = new jsPDF();
    
    // Get original dimensions
    const imgWidth = img.width;
    const imgHeight = img.height;

    // A4 dimensions in mm
    const pageSize = { width: 210, height: 297 };

    // Calculate how to fit the image on the page
    const ratio = Math.min(pageSize.width / imgWidth, pageSize.height / imgHeight);
    const newWidth = imgWidth * ratio;
    const newHeight = imgHeight * ratio;

    // Center the image on the page
    const x = (pageSize.width - newWidth) / 2;
    const y = (pageSize.height - newHeight) / 2;
    const finalName = this.customFileName.trim() || 'converted-image';
    doc.addImage(this.selectedImage!, 'PNG', x, y, newWidth, newHeight);
    doc.save(`${finalName}.pdf`);
  };
}
}
