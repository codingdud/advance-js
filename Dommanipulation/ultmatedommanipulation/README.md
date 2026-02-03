# 🎯 Complete DOM Manipulation Guide for Full Stack Developers

## Table of Contents
1. [Form Handling & Button Submission](#1-form-handling--button-submission)
2. [Scroll Events](#2-scroll-events)
3. [Event Manipulation (Hide, Add, Change, Update)](#3-event-manipulation)
4. [Event Delegation](#4-event-delegation)
5. [Event Bubbling & Capturing](#5-event-bubbling--capturing)

---

## 1. Form Handling & Button Submission

### Getting Form Data - Method 2: FormData API (Recommended)

```javascript
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Create FormData object
    const formData = new FormData(form);
    
    // Convert to object
    const dataObject = Object.fromEntries(formData);
    console.log(dataObject);
    // Output: { username: 'john', email: 'john@example.com', age: '25' }
    const outputDiv = document.getElementById('output');
    
    let html = '<h3>Submitted Data:</h3><ul>';
    for (let [key, value] of formData.entries()) {
        html += `<li><strong>${key}:</strong> ${value}</li>`;
    }
    html += '</ul>';
    
    outputDiv.innerHTML = html;
    outputDiv.style.display = 'block';
    form.reset();
});
```


### Real-time Input Validation

```javascript
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const cb=function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(this.value)) {
        emailError.textContent = 'Invalid email format';
        emailError.style.display = 'block';
    } else {
        emailError.style.display = 'none';
    }
};
function Debounce(fn,sec){
    let temp;
    return (...arg)=>{
        clearInterval(temp);
        temp=setInterval(()=>{
            fn(...arg)
        },sec)
    }
}
emailInput.addEventListener('input',Debounce(cb,4000));
```

---

## 2. Scroll Events


### Get Current Scroll Position

```javascript
window.addEventListener('scroll', function() {
    // Vertical scroll position
    const scrollTop = window.scrollY;
    // or
    const scrollTop2 = document.documentElement.scrollTop;
    
    // Horizontal scroll position
    const scrollLeft = window.scrollX;
    
    console.log('Vertical scroll:', scrollTop);
    console.log('Horizontal scroll:', scrollLeft);
});
```

### Scroll Progress Indicator

```javascript
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', function() {
    // Get scroll position
    const scrollTop = window.scrollY;
    
    // Get total scrollable height
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Calculate percentage
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Update progress bar width
    progressBar.style.width = scrollPercent + '%';
});
```

### Sticky Navigation on Scroll

```javascript
const nav = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});
```

### Show/Hide Element on Scroll

```javascript
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});
```

### Scroll Direction Detection

```javascript
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    
    if (scrollTop > lastScrollTop) {
        console.log('Scrolling DOWN');
        // Hide navbar when scrolling down
        navbar.style.top = '-80px';
    } else {
        console.log('Scrolling UP');
        // Show navbar when scrolling up
        navbar.style.top = '0';
    }
    
    lastScrollTop = scrollTop;
});
```

### Debounced Scroll Event (Performance Optimization)

```javascript
let scrollTimeout;

window.addEventListener('scroll', function() {
    // Clear previous timeout
    clearTimeout(scrollTimeout);
    
    // Set new timeout
    scrollTimeout = setTimeout(function() {
        console.log('Scroll stopped!');
        // Execute code after scrolling stops
    }, 150);
});
```

### Smooth Scroll to Element

```javascript
const scrollBtn = document.getElementById('scrollBtn');

scrollBtn.addEventListener('click', function() {
    const targetSection = document.getElementById('section2');
    
    // Method 1: Modern smooth scroll
    targetSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

// Method 2: Scroll to specific position
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
```

---

## 3. Event Manipulation (Hide, Add, Change, Update)

### Hide Elements

```javascript
const element = document.getElementById('myElement');

// Method 1: Using display
element.style.display = 'none';

// Method 2: Using visibility (keeps space)
element.style.visibility = 'hidden';

// Method 3: Using CSS class
element.classList.add('hidden'); // .hidden { display: none; }

// Hide multiple elements
const boxes = document.querySelectorAll('.box');
boxes.forEach(box => {
    box.style.display = 'none';
});
```

### Show Elements

```javascript
// Method 1: Display
element.style.display = 'block'; // or 'flex', 'grid', etc.

// Method 2: Visibility
element.style.visibility = 'visible';

// Method 3: Remove class
element.classList.remove('hidden');

// Show all
boxes.forEach(box => {
    box.style.display = 'block';
});
```

### Toggle Elements

```javascript
// Toggle visibility
element.classList.toggle('hidden');

// Custom toggle function
function toggleElement(element) {
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}
```

### Add New Elements

```javascript
// Create new element
const newDiv = document.createElement('div');

// Set content
newDiv.textContent = 'Hello World';
// or
newDiv.innerHTML = '<strong>Hello World</strong>';

// Set attributes
newDiv.id = 'newElement';
newDiv.className = 'box highlight';
newDiv.setAttribute('data-id', '123');

// Add to DOM
const container = document.getElementById('container');
container.appendChild(newDiv); // Add at end

// Alternative methods:
container.prepend(newDiv); // Add at beginning
container.insertBefore(newDiv, container.firstChild); // Insert before first child

// Insert adjacent
element.insertAdjacentElement('beforebegin', newDiv); // Before element
element.insertAdjacentElement('afterbegin', newDiv);  // First child
element.insertAdjacentElement('beforeend', newDiv);   // Last child
element.insertAdjacentElement('afterend', newDiv);    // After element
```

### Create Complex Elements

```javascript
// Method 1: Step by step
const card = document.createElement('div');
card.className = 'card';

const title = document.createElement('h3');
title.textContent = 'Card Title';

const content = document.createElement('p');
content.textContent = 'Card content goes here';

card.appendChild(title);
card.appendChild(content);
document.body.appendChild(card);

// Method 2: Using innerHTML (faster but less safe)
const container = document.getElementById('container');
container.innerHTML += `
    <div class="card">
        <h3>Card Title</h3>
        <p>Card content</p>
    </div>
`;
```

### Remove Elements

```javascript
const element = document.getElementById('myElement');

// Method 1: Modern way
element.remove();

// Method 2: Using parent
element.parentNode.removeChild(element);

// Remove all children
container.innerHTML = '';
// or
while (container.firstChild) {
    container.removeChild(container.firstChild);
}

// Remove specific elements
const boxes = document.querySelectorAll('.box');
boxes.forEach(box => box.remove());
```

### Update Text Content

```javascript
// Change text
element.textContent = 'New text';

// Change HTML
element.innerHTML = '<strong>Bold text</strong>';

// Append text
element.textContent += ' more text';

// Update all elements
const boxes = document.querySelectorAll('.box');
boxes.forEach((box, index) => {
    box.textContent = `Box ${index + 1}`;
});
```

### Change Styles

```javascript
// Single style
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '20px';

// Multiple styles
element.style.cssText = `
    color: red;
    background-color: blue;
    font-size: 20px;
    padding: 10px;
`;

// Using CSS classes (recommended)
element.classList.add('highlight');
element.classList.remove('active');
element.classList.toggle('selected');

// Check if class exists
if (element.classList.contains('active')) {
    console.log('Element is active');
}

// Replace class
element.classList.replace('old-class', 'new-class');
```

### Change Attributes

```javascript
// Set attribute
element.setAttribute('data-id', '123');
element.setAttribute('disabled', 'true');

// Get attribute
const id = element.getAttribute('data-id');

// Remove attribute
element.removeAttribute('disabled');

// Check if attribute exists
if (element.hasAttribute('data-id')) {
    console.log('Has data-id');
}

// Direct property access (for standard attributes)
element.id = 'newId';
element.src = 'image.jpg';
element.disabled = true;
```

### Clone Elements

```javascript
// Clone element
const original = document.getElementById('original');
const clone = original.cloneNode(true); // true = deep clone (includes children)

// Modify clone
clone.id = 'cloned';
clone.textContent = 'I am a clone';

// Add to DOM
document.body.appendChild(clone);
```

---

## 4. Event Delegation

### What is Event Delegation?

Event delegation is a technique where you attach a single event listener to a parent element instead of multiple listeners on child elements. This works because of event bubbling.

### Basic Event Delegation

```javascript
// Instead of this (BAD for dynamic content):
const buttons = document.querySelectorAll('.delete-btn');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        console.log('Button clicked');
    });
});

// Use this (GOOD):
const container = document.getElementById('container');
container.addEventListener('click', function(event) {
    // Check if clicked element is a button
    if (event.target.classList.contains('delete-btn')) {
        console.log('Delete button clicked');
    }
});
```

### Event Delegation with Multiple Element Types

```javascript
const taskList = document.getElementById('taskList');

taskList.addEventListener('click', function(event) {
    // Delete button clicked
    if (event.target.classList.contains('delete-btn')) {
        const taskItem = event.target.closest('.task-item');
        taskItem.remove();
    }
    
    // Edit button clicked
    if (event.target.classList.contains('edit-btn')) {
        const taskItem = event.target.closest('.task-item');
        const taskText = taskItem.querySelector('.task-text');
        taskText.contentEditable = true;
        taskText.focus();
    }
    
    // Task text clicked (toggle completion)
    if (event.target.classList.contains('task-text')) {
        event.target.classList.toggle('completed');
    }
});
```

### Dynamic List with Event Delegation

```javascript
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');

let taskId = 0;

// Add new task
addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.dataset.id = taskId++;
    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;
    
    taskList.appendChild(taskItem);
    taskInput.value = '';
});

// Event delegation for all tasks (works with dynamically added items!)
taskList.addEventListener('click', function(event) {
    const target = event.target;
    const taskItem = target.closest('.task-item');
    
    if (target.classList.contains('delete-btn')) {
        taskItem.remove();
    }
    
    if (target.classList.contains('edit-btn')) {
        const taskText = taskItem.querySelector('.task-text');
        const newText = prompt('Edit task:', taskText.textContent);
        if (newText) {
            taskText.textContent = newText;
        }
    }
    
    if (target.classList.contains('task-text')) {
        taskItem.classList.toggle('completed');
    }
});
```

### Event Delegation with matches()

```javascript
document.addEventListener('click', function(event) {
    // Check using matches()
    if (event.target.matches('.delete-btn')) {
        console.log('Delete button clicked');
    }
    
    // Check parent elements
    if (event.target.closest('.card')) {
        console.log('Clicked inside a card');
    }
});
```

### Event Delegation for Form Inputs

```javascript
const form = document.getElementById('form');

// Single listener for all inputs
form.addEventListener('input', function(event) {
    const input = event.target;
    
    // Email validation
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }
    }
    
    // Number validation
    if (input.type === 'number') {
        if (input.value < 0) {
            input.value = 0;
        }
    }
});
```

### Benefits of Event Delegation

```javascript
// ✅ Advantages:
// 1. Single event listener (better performance)
// 2. Works with dynamically added elements
// 3. Less memory usage
// 4. Simpler code maintenance

// ❌ Without delegation:
for (let i = 0; i < 1000; i++) {
    const btn = document.createElement('button');
    btn.addEventListener('click', handleClick); // 1000 listeners!
    container.appendChild(btn);
}

// ✅ With delegation:
container.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        handleClick(event);
    }
}); // Only 1 listener!
```

---

## 5. Event Bubbling & Capturing

### Understanding Event Propagation Phases

```
Event Propagation has 3 phases:

1. CAPTURING PHASE (top to bottom)
   window → document → html → body → parent → target

2. TARGET PHASE
   Event reaches the target element

3. BUBBLING PHASE (bottom to top)
   target → parent → body → html → document → window
```

### Event Bubbling (Default Behavior)

```javascript
// HTML Structure:
// <div id="parent">
//   <div id="child">
//     <button id="button">Click Me</button>
//   </div>
// </div>

const parent = document.getElementById('parent');
const child = document.getElementById('child');
const button = document.getElementById('button');

// All listeners use bubbling (default)
button.addEventListener('click', function() {
    console.log('1. Button clicked');
});

child.addEventListener('click', function() {
    console.log('2. Child div clicked');
});

parent.addEventListener('click', function() {
    console.log('3. Parent div clicked');
});

// When button is clicked, output:
// 1. Button clicked
// 2. Child div clicked
// 3. Parent div clicked
```

### Event Capturing

```javascript
// Add 'true' as third parameter to use capturing
button.addEventListener('click', function() {
    console.log('1. Button clicked');
}, true); // Capturing!

child.addEventListener('click', function() {
    console.log('2. Child div clicked');
}, true); // Capturing!

parent.addEventListener('click', function() {
    console.log('3. Parent div clicked');
}, true); // Capturing!

// When button is clicked, output:
// 3. Parent div clicked
// 2. Child div clicked
// 1. Button clicked
```

### Mixed Capturing and Bubbling

```javascript
// Parent uses capturing
parent.addEventListener('click', function() {
    console.log('1. Parent (capturing)');
}, true);

// Child uses bubbling (default)
child.addEventListener('click', function() {
    console.log('2. Child (bubbling)');
}, false);

// Button uses bubbling
button.addEventListener('click', function() {
    console.log('3. Button (bubbling)');
}, false);

// Output when button clicked:
// 1. Parent (capturing)    <- Capturing phase
// 3. Button (bubbling)     <- Target phase
// 2. Child (bubbling)      <- Bubbling phase
```

### Stop Propagation

```javascript
button.addEventListener('click', function(event) {
    console.log('Button clicked');
    event.stopPropagation(); // Stops bubbling/capturing
});

child.addEventListener('click', function() {
    console.log('This will NOT execute');
});

parent.addEventListener('click', function() {
    console.log('This will NOT execute either');
});
```

### Stop Immediate Propagation

```javascript
button.addEventListener('click', function(event) {
    console.log('First handler');
    event.stopImmediatePropagation(); // Stops ALL handlers
});

button.addEventListener('click', function() {
    console.log('This will NOT execute');
});

parent.addEventListener('click', function() {
    console.log('This will NOT execute either');
});
```

### Practical Example: Modal Close on Backdrop Click

```javascript
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementById('closeBtn');

// Close modal when clicking backdrop
modal.addEventListener('click', function(event) {
    console.log('Modal backdrop clicked - closing modal');
    modal.style.display = 'none';
});

// Prevent closing when clicking modal content
modalContent.addEventListener('click', function(event) {
    console.log('Modal content clicked - preventing close');
    event.stopPropagation(); // Don't bubble to parent
});

// Close button
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});
```

### Event Delegation with Bubbling

```javascript
// Event delegation relies on bubbling!
document.getElementById('taskList').addEventListener('click', function(event) {
    // event.target = actual element clicked
    // event.currentTarget = element with the listener (taskList)
    
    console.log('Clicked element:', event.target);
    console.log('Event listener on:', event.currentTarget);
    
    if (event.target.classList.contains('delete-btn')) {
        const task = event.target.closest('.task-item');
        task.remove();
    }
});
```

### Capture vs Bubble Use Cases

```javascript
// Use BUBBLING (default) for:
// - Most event handling
// - Event delegation
// - General interactions

// Use CAPTURING for:
// - Intercepting events before they reach target
// - Global event handlers
// - Event logging/analytics

// Example: Global click logger (capturing)
document.addEventListener('click', function(event) {
    console.log('User clicked:', event.target);
    // Log to analytics
}, true); // Capturing ensures this runs first
```

### Event Properties

```javascript
element.addEventListener('click', function(event) {
    // Event target info
    console.log('target:', event.target);           // Element that triggered event
    console.log('currentTarget:', event.currentTarget); // Element with listener
    console.log('type:', event.type);               // Event type (click)
    
    // Phase info
    console.log('eventPhase:', event.eventPhase);
    // 1 = CAPTURING_PHASE
    // 2 = AT_TARGET
    // 3 = BUBBLING_PHASE
    
    // Bubbling control
    console.log('bubbles:', event.bubbles);         // Can it bubble?
    console.log('cancelable:', event.cancelable);   // Can preventDefault?
    
    // Mouse info (for mouse events)
    console.log('clientX:', event.clientX);
    console.log('clientY:', event.clientY);
});
```

### Complete Example: Interactive Event Flow

```javascript
const parent = document.getElementById('parent');
const child = document.getElementById('child');
const grandchild = document.getElementById('grandchild');
const log = document.getElementById('log');

function logEvent(elementName, phase, useCapture) {
    return function(event) {
        const phaseText = useCapture ? 'CAPTURING' : 'BUBBLING';
        const message = `${elementName} - ${phaseText}`;
        
        const logEntry = document.createElement('div');
        logEntry.textContent = message;
        log.appendChild(logEntry);
        
        console.log(message);
    };
}

// Capturing phase listeners
parent.addEventListener('click', logEvent('Parent', 'capturing', true), true);
child.addEventListener('click', logEvent('Child', 'capturing', true), true);
grandchild.addEventListener('click', logEvent('Grandchild', 'target', true), true);

// Bubbling phase listeners
grandchild.addEventListener('click', logEvent('Grandchild', 'target', false), false);
child.addEventListener('click', logEvent('Child', 'bubbling', false), false);
parent.addEventListener('click', logEvent('Parent', 'bubbling', false), false);

// Click grandchild to see full event flow:
// Parent - CAPTURING
// Child - CAPTURING
// Grandchild - TARGET
// Grandchild - TARGET
// Child - BUBBLING
// Parent - BUBBLING
```

---

## 🎯 Best Practices Summary

### Forms
- Always use `event.preventDefault()` on form submit
- Use `FormData` API for easy data collection
- Validate on both input and submit events
- Provide user feedback for validation errors

### Scroll Events
- Debounce scroll listeners for performance
- Use `requestAnimationFrame` for smooth animations
- Calculate percentages for progress indicators
- Consider using Intersection Observer API for advanced use cases

### Element Manipulation
- Use `classList` instead of direct `className` manipulation
- Prefer `createElement` over `innerHTML` for security
- Cache DOM queries in variables
- Remove event listeners when removing elements

### Event Delegation
- Use for dynamic content and lists
- Attach listeners to closest stable parent
- Use `event.target.matches()` or `closest()` for identification
- Remember: event delegation relies on bubbling

### Bubbling & Capturing
- Default to bubbling (it's simpler)
- Use capturing only when needed
- Be careful with `stopPropagation()` - it can break delegation
- Understand the difference between `target` and `currentTarget`

---

## 🚀 Practice Exercises

1. **Form Challenge**: Build a multi-step form with validation
2. **Scroll Challenge**: Create an infinite scroll loader
3. **Manipulation Challenge**: Build a draggable todo list
4. **Delegation Challenge**: Create a dynamic table with sortable columns
5. **Events Challenge**: Build a nested dropdown menu system

Happy coding! 🎉