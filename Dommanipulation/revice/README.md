# Revice DOM Practice Project

This small project combines the DOM concepts already practiced in this workspace into one place. Open `index.html` in a browser and use each section like a mini exercise.

## What this project covers

- DOM selection with `getElementById`, `querySelector`, and `querySelectorAll`
- Creating elements with `createElement`
- Updating content with `textContent` and `innerHTML`
- Changing styles with `classList`
- Handling events with `click`, `input`, `scroll`, and `submit`
- Event delegation using one listener on a parent element
- Event bubbling and capturing order
- Form submission with `FormData`
- Simple email validation
- Saving and loading data with `localStorage`

## Practice Todo List

- [ ] Create at least 3 cards in the Selector and Element Lab.
- [ ] Rename the first card and inspect which DOM method changed it.
- [ ] Toggle highlight on all cards and inspect the class change in DevTools.
- [ ] Click the counter button 5 times and verify the text updates correctly.
- [ ] Type inside the live input and confirm the mirror text updates on every keystroke.
- [ ] Scroll the practice box and explain how the progress bar width is calculated.
- [ ] Add 2 new tasks to the delegated list.
- [ ] Complete one task and remove one task using the delegated buttons.
- [ ] Find the single event listener that handles task button clicks.
- [ ] Click the inner propagation box and note the capture order and bubble order.
- [ ] Clear the event log and repeat the propagation test.
- [ ] Submit the profile form with a valid email.
- [ ] Try an invalid email and confirm the validation message appears.
- [ ] Reload the page and load the saved profile from `localStorage`.
- [ ] Clear saved data and confirm the preview resets.

## Suggested self-practice changes

- [ ] Add a button to delete the last created card.
- [ ] Add keyboard events such as `keydown` or `keyup`.
- [ ] Store the task list in `localStorage` so tasks persist.
- [ ] Add a dark theme toggle using class manipulation.
- [ ] Replace `innerHTML` in the profile preview with fully created DOM nodes.

## Files

- `index.html` contains the DOM practice layout.
- `styles.css` contains the styling for each exercise panel.
- `script.js` contains all DOM logic for practice.