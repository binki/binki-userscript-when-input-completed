Wait for text to be pasted or autocompleted into an input.

For autologin scripts, it is desirable not to interfere with the user’s attempt to manually type into a field. However, if a user pastes or if the browser autofills the field, it is desirable to take some automatic action immediately afterward.

This script implements a few simple heuristics of waiting for a specific input element to gain a complete value without relying on a change event triggered by a blur. It is expected to be generally correct but not perfect, though the possibilty of making this perfect is welcome. For example, this might not yet support detecting input from IME as user-entered.

# Heuristics

## Big Change Detection

If the length of the input value changes by more than 1 character at once, the value is presumed to be pasted. The default check requires the input length to increase by at least 4 to count as a paste.

## Max Length Check

If the input has a `max` attribute, the input is assumed complete when this length is reached. This supports hand-typed entry for some TOTP fields, which is common when TOTP is stored on a mobile device but entered on a desktop.

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
