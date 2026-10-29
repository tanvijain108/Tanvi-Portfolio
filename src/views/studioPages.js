import { html, prose, arrowIcon } from './html.js';
import { layout } from './layout.js';
import { projectArt } from './studioParts.js';
import { STUDIO_SERVICES } from '../studioServices.js';
import { TOPICS } from '../content.js';
import { serviceToolChips } from './toolkit.js';
import { PROFILE } from '../portfolioProfile.js';

const PROCESS = PROFILE.process;

function pageHero(title, eyebrow, intro = '') {
  return html`<section class="page-hero"><div class="page-wrap"><p class="page-eyebrow" data-reveal>${eyebrow}</p><h1 class="display-title" data-kinetic>${title}</h1>${intro && html`<p class="page-intro" data-reveal>${intro}</p>`}</div></section>`;
}

function projectCard(project) {
  return html`<a class="project-card" href="/work/${project.slug}" data-reveal data-cursor="View"><div class="project-card-art">${projectArt(project)}</div><div class="project-card-meta"><h3>${project.title}</h3><span>${project.template ? 'Coming soon' : project.year || ''}</span></div><p class="project-card-type">${project.template ? 'UI / UX case study template' : project.category}</p></a>`;
}

function processGrid(steps = PROCESS) {
  return html`<div class="process-grid">${steps.map((step, index) => {
    const title = Array.isArray(step) ? step[0] : step.title;
    const description = Array.isArray(step) ? step[1] : step.description;
    return html`<article class="process-card" data-reveal><span class="section-number">${String(index + 1).padStart(2, '0')}</span><h3>${title}</h3><p>${description}</p></article>`;
  })}</div>`;
}

function processFlow(steps) {
  return html`<ol class="process-flow" aria-label="Design process">${steps.map((step, index) => html`<li class="process-step" data-reveal><button class="process-choice" type="button" aria-pressed="${index === 0}" aria-describedby="process-description-${index}"><span class="process-node" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><span class="process-title">${step.title}</span></button><p id="process-description-${index}">${step.description}</p></li>`)}</ol>`;
}

export function aboutPage({ site, siteUrl }) {
  const body = html`${pageHero('About', 'THE PERSON BEHIND THE PIXELS')}
  <section class="about-intro page-wrap">
    <div class="about-portrait-wrap"><figure class="about-portrait about-portrait-real" data-reveal data-tilt><img class="about-portrait-image" src="${PROFILE.portrait}" alt="Illustrated portrait of Tanvi Jain" width="632" height="767" decoding="async" fetchpriority="high"/></figure></div>
    <div class="story-copy"><p class="about-lead" data-reveal>${PROFILE.aboutParagraphs[0]}</p>
      <div class="about-body" data-reveal>${PROFILE.aboutParagraphs.slice(1).map((paragraph) => html`<p>${paragraph}</p>`)}</div>
      <div class="about-links" data-reveal><a class="outline-button" href="${PROFILE.resumeUrl}" target="_blank" rel="noopener">View résumé <span aria-hidden="true">${arrowIcon()}</span></a><a class="text-link" href="/contact">Let's work together <span aria-hidden="true">${arrowIcon()}</span></a></div>
    </div>
  </section>
  <section class="process-section about-process page-wrap"><div class="about-process-heading"><h2 class="section-label" data-reveal>Design with strategy and creativity</h2><p class="process-intro" data-reveal>${PROFILE.processIntro}</p></div>${processGrid()}</section>`;
  return layout({ title: 'About Tanvi · UI / UX Designer', description: PROFILE.aboutParagraphs[0], path: '/about', siteUrl, site, body });
}

export function workPage({ site, siteUrl, projects = [] }) {
  const body = html`<section class="page-hero work-page-hero"><div class="page-wrap work-page-heading"><div><p class="page-eyebrow" data-reveal>SELECTED IDEAS. CONSIDERED DETAILS.</p><h1 class="display-title" data-kinetic>Work</h1></div><div class="view-toggle" role="group" aria-label="Project view"><button type="button" data-work-view="list" aria-pressed="true">List</button><button type="button" data-work-view="grid" aria-pressed="false">Grid</button></div></div></section>
  <section class="work-collection page-wrap" data-view="list" aria-label="Portfolio projects">
    <div class="work-table" data-view-panel="list"><div class="work-table-head" aria-hidden="true"><span>#</span><span>Project</span><span>Type</span><span>Role</span><span>Year</span></div>
      ${projects.map((project, index) => html`<a class="work-table-row" href="/work/${project.slug}" data-project-preview="${index}" data-reveal data-cursor="View"><span class="work-table-number">${String(index + 1).padStart(2, '0')}</span><h3 class="work-table-name">${project.title}</h3><span class="work-table-type">${project.template ? 'Case study coming soon' : project.category}</span><span class="work-table-role">UI / UX design</span><span class="work-table-year">${project.template ? '—' : project.year || '—'}</span><span class="row-preview" aria-hidden="true">${projectArt(project)}</span></a>`)}
      ${projects.length === 0 && html`<p class="empty-state">New project stories are on the way.</p>`}
    </div>
    <div class="work-grid" data-view-panel="grid" hidden>${projects.map(projectCard)}</div>
  </section>`;
  return layout({ title: 'Work · Tanvi · UI / UX Designer', description: 'Explore Tanvi’s portfolio of product thinking, research and interface design.', path: '/work', siteUrl, site, body });
}

export function servicesPage({ site, siteUrl }) {
  const descriptions = [
    'Website and mobile app design, user flows, wireframes, interactive prototypes, design systems and dashboard interfaces.',
    'Corporate websites, landing pages and service pages with responsive layouts, clear navigation and content hierarchy.',
    'AI-assisted UI concepts, prompt development, visual assets, creative exploration and rapid prototyping.',
    'Chatbot interfaces, conversation flows, assistant layouts and response states for clear human-AI interactions.',
    'Responsive web interfaces, HTML/CSS implementation, JavaScript interactions and design-to-code refinements.',
    'Brand-consistent website visuals, social posts, carousels, reels and campaign creatives.',
    'Usability reviews, heuristic evaluations, competitor research and accessibility audits with practical recommendations.',
  ];
  const body = html`<section class="simple-services-hero page-wrap"><p class="page-eyebrow">SERVICES</p><h1 data-kinetic>Thoughtful design.<br><em>Useful digital experiences.</em></h1><p>UI/UX design, AI-assisted creative work and frontend development. Here's how I can help.</p></section>
  <section class="services-offerings simple-services page-wrap" id="offerings" aria-label="Design services">${STUDIO_SERVICES.map((service, index) => html`<a class="simple-service" data-cursor-label="&#8599;" href="/services/${service.slug}"><span class="simple-service-number">${String(index + 1).padStart(2, '0')}</span><h2>${service.title}</h2><div class="simple-service-content"><p>${descriptions[index]}</p>${serviceToolChips(service.slug)}</div><span class="simple-service-arrow" aria-hidden="true">${arrowIcon()}</span></a>`)}</section>`;

  return layout({ title: 'Services · Tanvi · UI / UX Designer', description: 'UI/UX design, website design, AI-powered design, chatbot UX, frontend development, brand content and accessibility with Tanvi.', path: '/services', siteUrl, site, body });
}

export function serviceDetailPage({ site, siteUrl, projects = [], service, slug }) {
  const selected = service || STUDIO_SERVICES.find((item) => item.slug === slug);
  if (!selected) throw new Error('A valid design service is required.');
  const index = STUDIO_SERVICES.findIndex((item) => item.slug === selected.slug);
  const next = STUDIO_SERVICES[(index + 1) % STUDIO_SERVICES.length];
  const body = html`<section class="page-hero service-detail-hero"><div class="page-wrap"><a class="back-link" href="/services">← All services</a><p class="page-eyebrow">${String(index + 1).padStart(2, '0')} / A CONSIDERED PART OF THE PROCESS</p><h1 class="display-title" data-kinetic>${selected.title}</h1></div></section>
  <section class="service-overview page-wrap"><p class="service-lead" data-reveal>${selected.description}</p><a class="pill-button" href="/contact" data-magnet>Let's talk about your project <span aria-hidden="true">${arrowIcon()}</span></a></section>
  <section class="deliverables-section page-wrap"><h2 class="section-label" data-reveal>What the work can include</h2><ul class="deliverables-list">${selected.deliverables.map((deliverable, itemIndex) => html`<li data-reveal><span class="section-number">${String(itemIndex + 1).padStart(2, '0')}</span><p>${deliverable}</p></li>`)}</ul></section>
  <section class="process-section service-process page-wrap"><h2 class="section-label" data-reveal>Design process</h2>${processFlow(selected.process)}</section>
  <section class="service-faq page-wrap"><div class="section-heading"><p class="page-eyebrow">A FEW USEFUL ANSWERS</p><h2 data-reveal>About ${selected.shortTitle.toLowerCase()}.</h2></div><div class="faq-list">${selected.faqs.map((faq, faqIndex) => html`<details class="faq-item"${faqIndex === 0 && html` open`} data-reveal><summary>${faq.question}<span aria-hidden="true">+</span></summary><div class="faq-answer">${prose(faq.answer)}</div></details>`)}</div></section>
  ${projects.length > 0 && html`<section class="related-work page-wrap"><div class="section-heading"><h2 class="section-label">A little of the work</h2><a class="text-link" href="/work">All projects ${arrowIcon()}</a></div><div class="related-work-grid">${projects.slice(0, 2).map(projectCard)}</div></section>`}
  <section class="next-service page-wrap"><p class="page-eyebrow">EXPLORE ANOTHER SERVICE</p><a href="/services/${next.slug}" data-cursor="Next"><span>${next.title}</span><span class="next-service-arrow" aria-hidden="true">${arrowIcon()}</span></a></section>`;
  return layout({ title: `${selected.title} · Tanvi · UI / UX Designer`, description: selected.description, path: `/services/${selected.slug}`, siteUrl, site, body, scripts: ['service-process.js'] });
}

export function contactPage({ site, siteUrl }) {
  const body = html`${pageHero(html`Say <span class="blue">hi</span>`, 'GOOD THINGS START WITH A CONVERSATION.')}
  <section class="contact-layout page-wrap"><div class="contact-intro" data-reveal><p class="contact-lead">Good ideas start with a conversation. Let's shape yours.</p><div class="contact-detail"><h2 class="section-label">Email</h2><a class="contact-email" href="mailto:${site.email}">${site.email}</a></div><div class="contact-detail"><h2 class="section-label">Phone</h2><a href="${PROFILE.phoneHref}">${PROFILE.phone}</a></div></div>
  <form class="contact-form" id="contactForm" data-email="${site.email}" aria-label="Project enquiry" novalidate data-reveal>
    <p class="contact-form-help sr-only">Name, email and project details are required. Services are optional.</p>
    <div class="field"><label for="contactName">Your name <span class="required-label" aria-hidden="true">*</span></label><input id="contactName" type="text" name="name" autocomplete="name" placeholder="How should I call you?" maxlength="100" required aria-describedby="nameError"/><span class="err" data-for="name" id="nameError"></span></div>
    <div class="field"><label for="contactEmail">Email address <span class="required-label" aria-hidden="true">*</span></label><input id="contactEmail" type="email" name="email" autocomplete="email" placeholder="you@example.com" maxlength="200" required aria-describedby="emailError"/><span class="err" data-for="email" id="emailError"></span></div>
    <div class="field contact-options"><span class="contact-option-label" id="contactNeeds">What do you need? <span class="optional">(optional)</span></span><p class="choice-help" id="needsHelp">Choose any that apply.</p><div class="option-chips" role="group" aria-labelledby="contactNeeds" aria-describedby="needsHelp topicError">${TOPICS.map((topic) => html`<button class="option-chip" type="button" data-need="${topic}" aria-pressed="false">${topic}</button>`)}</div><input type="hidden" name="topic" value=""/><span class="err" data-for="topic" id="topicError"></span></div>
    <input type="hidden" name="budget" value=""/>
    <div class="field"><label for="contactMessage">Project details <span class="required-label" aria-hidden="true">*</span></label><textarea id="contactMessage" name="message" placeholder="A little about your project…" rows="4" maxlength="5000" required aria-describedby="messageError"></textarea><span class="err" data-for="message" id="messageError"></span></div>
    <div class="hp" aria-hidden="true"><label for="contactWebsite">Leave this empty</label><input id="contactWebsite" type="text" name="website" autocomplete="off" tabindex="-1" value=""/></div>
    <div class="contact-submit-row"><button class="pill-button contact-submit" type="submit" data-magnet data-cursor="Send">Send enquiry <span aria-hidden="true">${arrowIcon()}</span></button><p class="form-status" id="formStatus" role="status" aria-live="polite">I’ll get back to you to talk through the details.</p></div>
  </form></section>`;
  return layout({ title: 'Contact · Tanvi · UI / UX Designer', description: 'Talk to Tanvi about product design, research, interfaces or your next digital idea.', path: '/contact', siteUrl, site, body, scripts: ['contact.js'] });
}
