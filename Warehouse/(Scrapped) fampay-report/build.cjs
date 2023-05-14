const fs = require('fs');
const path = require('path');

const markdownDir = path.join(__dirname, 'src/markdown');
const pagesDir = path.join(__dirname, 'src/pages');
const sidebarFile = path.join(__dirname, 'src/components/Sidebar.astro');

fs.readdir(markdownDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  let sidebarContent = `
---
---

<aside>
  <nav>
    <ul>
  `;

  files.forEach(file => {
    const name = path.basename(file, '.md');
    const pageFile = path.join(pagesDir, `${name}.astro`);

    // Create .astro file for page
    fs.writeFile(pageFile, `
---
import DefaultLayout from '../layouts/DefaultLayout.astro';
import {Content as ${name}Content} from '../markdown/${file}';
---

<DefaultLayout>
  <${name}Content />
</DefaultLayout>
    `, (err) => {
      if (err) {
        console.error(err);
      }
    });

    // Add link to sidebar
    sidebarContent += `<li><a href="/${name}">${name}</a></li>\n`;
  });

  sidebarContent += `
    </ul>
  </nav>
</aside>
  `;

  // Update Sidebar.astro
  fs.writeFile(sidebarFile, sidebarContent, (err) => {
    if (err) {
      console.error(err);
    }
  });
});
