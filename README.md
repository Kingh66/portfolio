# 🚀 Sizwe Mthembu - Portfolio  

Welcome to my **professional portfolio!** 🎨✨  
This project showcases my **skills, projects, and experience** as a **Full Stack Developer**. Designed with a **modern, cyberpunk-inspired aesthetic**, it includes **dark/light mode, smooth animations, and a fully responsive layout.**  

---

## 🌟 Features  

✅ **Dark/Light Mode Toggle** – Switch between themes with a smooth animation.  
✅ **Interactive Animations** – Hover effects, loading animations, and smooth scrolling.  
✅ **Responsive Design** – Optimized for **desktop, tablet, and mobile** devices.  
✅ **Project Showcase** – Highlights key projects with **live demos and source code links**.  
✅ **Skills Section** – Detailed breakdown of **technical skills and tools**.  
✅ **Experience Timeline** – Visual timeline of **education and work experience**.  
✅ **Contact Form** – Functional form with **EmailJS integration** for messaging.  
✅ **Loading Screen** – Stylish **progress bar and countdown** on page load.  

---

## 🛠️ Technologies Used  

### **Frontend**  
- 🎨 **HTML5, CSS3, JavaScript**  
- 🎭 **Font Awesome Icons**  
- ✍️ **Google Fonts (Poppins)**  

### **Backend**  
- 📩 **EmailJS** for contact form functionality  

### **Tools**  
- 🛠️ **Git & GitHub** for version control  
- 💻 **Visual Studio Code** for development  
- 🎨 **Figma** for UI/UX design  
- 🌍 **WampServer & IntelliJ IDEA** for local development and backend support  

---

## 🌍 Live Demo  

🔗 **Check out the live version of my portfolio:** [Portfolio Live Demo](https://portfolio-vo6v.onrender.com/) <!-- Replace with your actual URL -->

---

## 📥 Installation  

To run this project locally, follow these steps:  

### **1️⃣ Clone the repository**  
```bash
git clone https://github.com/Kingh66/portfolio.git
cd portfolio
```

### **2️⃣ Open the project**  
Open **index.html** in your browser.

### **3️⃣ Customize**  
Replace placeholder content (images, text, links) with your own.

---

## 🎮 Usage  

🔗 **Navigation:** Use the navigation bar to jump to different sections.  
🌗 **Theme Toggle:** Click the sun/moon icon to switch between dark and light modes.  
📬 **Contact Form:** Fill out the form to send me a message (requires EmailJS setup).  
🔍 **Project Links:** Click on project cards to view live demos or source code.  

---

## 📂 Folder Structure  
```bash
portfolio/
├── index.html          # Main HTML file
├── styles.css          # Main CSS file
├── script.js           # JavaScript for interactivity
├── assets/             # Folder for images and icons
│   ├── me1.jpeg        # Profile picture
│   ├── krispybox.png   # Project image
│   ├── featherfinder.png # Project image
│   └── ibooks.png      # Project image
├── README.md           # This file
├── Dockerfile          # Docker configuration
```

---

## 🛠️ Customization  

### **🖼️ Update Content**  
- Replace **me1.jpeg** with your profile picture.  
- Update **project images, descriptions, and links** in the projects section.  
- Modify the **skills, experience, and contact information**.  

### **📩 EmailJS Setup**  
- Sign up at **EmailJS**.  
- Replace the **EmailJS template ID, service ID, and user ID** in **script.js**.  

### **🚀 Deploy**  
Host the portfolio on platforms like:  
- **GitHub Pages**  
- **Netlify**  
- **Vercel**  

---

## 🐳 Docker Setup  

This project can also be **run inside a Docker container**. Follow these steps:  

### **1️⃣ Build the Docker Image**  
```bash
docker build -t my-portfolio .
```

### **2️⃣ Run the Docker Container**  
```bash
docker run -d -p 8080:80 my-portfolio
```
Your portfolio will now be available at: **http://localhost:8080**  

---

## 🐙 Dockerfile  
```dockerfile
# Use an official lightweight Nginx image
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx static content
RUN rm -rf ./*

# Copy project files into the container
COPY . .

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🎨 Credits  
- **Fonts:** Google Fonts - Poppins  
- **Icons:** Font Awesome  
- **Animations:** Custom CSS animations and transitions  

---

## 📜 License  
📄 This project is licensed under the **MIT License**. See the LICENSE file for details.  

---

## 📞 Contact  

👤 **Name:** Sizwe Philani Mthembu  
📧 **Email:** sizwemthembu03@gmail.com  
📱 **Phone:** +27 79 655 0842  
📍 **Location:** Durban, South Africa  

🔗 **LinkedIn:** [Sizwe Mthembu](https://www.linkedin.com/in/sizwe-philani-didiza-mthembu-72993a248/)
🐙 **GitHub:** [Kingh66](https://github.com/Kingh66)  



