Wait for text to be pasted or autocompleted into an input.

For autologin scripts, it is desirable not to interfere with the user’s attempt to manually type into a field. However, if a user pastes or if the browser autofills the field, it is desirable to take some automatic action immediately afterward.

This script implements a simple heuristic of waiting for a specific input element to gain a value without relying on a change event triggered by a blur. It is expected to be generally correct but not perfect, though the possibilty of making this perfect is welcome. For example, this might not yet support detecting input from IME as user-entered.

# Usage

Include this in your userscript using [`@require`](https://wiki.greasespot.net/Metadata_Block#.40require). It is recommended to [use a permalink](https://docs.github.com/repositories/working-with-files/using-files/getting-permanent-links-to-files) instead of referring to `master`.

```js
// ==UserScript==
// @name example
// @version 1.0
// @require https://github.com/binki/binki-userscript-when-input-completed/raw/master/binki-userscript-when-input-completed.js
// ==UserScript==

(async () => {
  await whenInputCompletedAsync(document.getElementById('email'));
  document.getElementById('submit').click();
})();
```

# API

```js
whenInputCompletedAsync(inputElement, signal, maybeAutoCompleteDelta);
```

Parameters:

* `inputElement` is the `HTMLInputElement` to watch.
* `signal` (optional) is the `AbortSignal` used to cancel the operation.
* `maybeAutoCompleteDelta` (optional) is the number of characters which must be changed to be considered an autofill/paste instead of a typed character. This defaults to 4.
