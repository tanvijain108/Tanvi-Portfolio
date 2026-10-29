// One selected step, shared by pointer, touch and keyboard interaction.
document.querySelectorAll('.process-flow').forEach(function (flow) {
  var choices = Array.from(flow.querySelectorAll('.process-choice'));
  function select(choice) {
    choices.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button === choice));
    });
  }
  choices.forEach(function (choice, index) {
    choice.addEventListener('pointerenter', function (event) {
      if (event.pointerType !== 'touch') select(choice);
    });
    choice.addEventListener('focus', function () { select(choice); });
    choice.addEventListener('click', function () { select(choice); });
    choice.addEventListener('keydown', function (event) {
      var next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % choices.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + choices.length) % choices.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = choices.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      choices[next].focus();
    });
  });
});
