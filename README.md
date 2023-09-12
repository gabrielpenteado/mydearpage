<h1 align="center">
   <strong>MyDearPage</strong>
</h1>

<h2 align="center">
  A personalized start webpage 
</h2>

<div align="center">
  <a href="https://github.com/gabrielpenteado/mydearpage/blob/main/LICENSE.md">
    <img src="https://img.shields.io/github/license/gabrielpenteado/mydearpage?color=informational" alt="license"/>
  </a>

  <img src="https://img.shields.io/static/v1?label=npm&message=v6.14.11&color=informational&style=flat-square" alt="npm version">

  <img src="https://img.shields.io/website?down_color=red&down_message=offline&style=flat-square&up_color=008000&up_message=online&url=https%3A%2F%2Fmydearpage.netlify.app" alt="website status">
</div>

## 📑 Contents

- [About the project](#-about-the-project)
  - Built with
  - Website
- [Getting Started](#-getting-started)
  - Requirements
  - Installation
- [Features](#-features)
  - Custom icons
  - To-do list
  - Weather app
  - Wallpaper changer
  - Digital clock
  - Alerts
  - Responsive web design
- [Contributions](#-contributions)
- [License](#-license)
  <br>

## 💡 About the project

<p align="justify"> 
  <strong>MyDearPage</strong> is a personalized start webpage to kickstart your web browsing with <em>CUSTOM ICONS</em> for the main websites, a multiple colors <em>TO-DO LIST</em>, the <em>WEATHER APP</em> with daily forecast, <em>DIGITAL CLOCK</em> and a <em>WALLPAPER CHANGE</em> feature. It has a unique <em>ALERT SYSTEM</em> and <em>RESPONSIVE WEB DESIGN</em>.
</p>

<div align="center">
  <table>
    <thead>
      <tr>
        <th style="text-align: center">
          Video
        </th>
        <th style="text-align: center">
          Website
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <a href="https://www.youtube.com/watch?v=HPRoGpF1nsM">
            <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" />
          </a>
        </td>  
        <td>
          <a href="https://mydearpage.netlify.app">
            <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" />
          </a>
        </td>  
      </tr>
    </tbody>
  </table>
</div>

<p align="center">
    <img src="https://raw.githubusercontent.com/gabrielpenteado/mydearpage/main/public/assets/screenshots/mydearpage.png"> 
</p>

### Built with

![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

<!-- ### Website
You can access the project website with all features by clicking below: -->

<!-- [![Website shields.io](https://img.shields.io/website?down_color=red&down_message=OFF&style=for-the-badge&up_color=green&up_message=ON&url=https%3A%2F%2Fmydearpage.onrender.com)](https://mydearpage.onrender.com) -->

<!-- [![netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://mydearpage.netlify.app/) -->

## 💥 Getting started

To start using <strong>MyDearPage</strong> follow the instructions below.

### Requirements

- npm (v6.14.11)
- node.js (v14.16.0)

  > [Click here](https://nodejs.org/en/download/) to install.

- weather API key
  > [Click here](https://openweathermap.org/api) and select **One Call API**.

### Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_24x24.png" alt="Chrome" />](https://www.google.com/intl/en/chrome/)<br> Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_24x24.png" alt="Edge" />](https://www.microsoft.com/en-us/edge)<br> Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_24x24.png" alt="Firefox" />](https://www.mozilla.org/en-US/firefox/new/)<br> Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_24x24.png" alt="Safari" />](https://www.apple.com/br/safari/)<br> Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_24x24.png" alt="Opera" />](https://www.opera.com)<br> Opera |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                   ✅                                                                                   |                                                                              ✅                                                                              |                                                                                       ✅                                                                                       |                                                                                ✅                                                                                |                                                                        ✅                                                                         |
|                                                                              last version                                                                              |                                                                         last version                                                                         |                                                                                  last version                                                                                  |                                                                           last version                                                                           |                                                                   last version                                                                    |

### Installation

1. Clone the repository<br>
   `git clone https://github.com/gabrielpenteado/mydearpage.git`

2. Access the project folder in the terminal

3. Install npm packages<br>
   `npm install`

4. Enter your API key in `.env_sample` and rename it to `.env`<br>
   `weatherApiKey=`YOUR_WEATHER_API_HERE

5. Start using<br>
   `npm start`

6. Access `http://localhost:8000` in your browser
   <br>

## ⚡ Features

### ◾ Custom icons
<p>Shortcut icons for the most visited sites on the web.</p>

### ◾ To-do list
<p>With option to select the background color of each to-do.</p>

_Note: The to-do list doesn't disappear after refreshing the page or after closing the tab. It will disappear only if you clear data of your browser._

### ◾ Weather app
<p>Weather forecast using browser geolocation or by typing the name of the city.</p>

_Note: The animated weather icons are attributed to_ [amCharts](https://www.amcharts.com/free-animated-svg-weather-icons/).

### ◾ Wallpaper changer
<p>The wallpaper can be changed manually or automatically (daily or weekly).</p>

### ◾ Digital clock
<p>A digital clock with date.</p>

### ◾ Alerts
<p>A personalized alert system with warnings about to-do limits and errors in the weather forecast app.</p>

### ◾ Responsive web design
<p>MyDearPage automatically adjust for different screen sizes ensuring a pleasant user experience for all devices.</p>


## 🤝 Contributions

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)<br>
The foundation of the open source community are the contributions, them inspire us to learn and create. Any contributions are greatly appreciated.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE.md](https://github.com/gabrielpenteado/mydearpage/blob/main/LICENSE.md) file for details.
<br>
<br>

<div align="center">
  <img src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/63300269?v=4&h=100&w=100&fit=cover&mask=circle&maxage=7d" />
  <h1>Gabriel Penteado</h1>
  <strong>Full Stack Developer</strong>
  <br/>
  <br/>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabriel-penteado)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/gabrielpenteado)
[![Gmail](https://img.shields.io/badge/gabripenteado@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:gabripenteado@gmail.com)
<br />
<br />

</div>
