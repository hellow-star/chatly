# Reusable Components

This directory contains reusable React components for the application.

## FormField

A styled form input field with integrated label, error handling, and animations.

**Props:**
- `label` (string, required): The text for the form field label.
- `type` (string, optional, default: 'text'): The input type (e.g., 'text', 'email', 'password').
- `name` (string, required): The name of the field, used for registration and form state.
- `register` (function, required): The `register` function from `react-hook-form`.
- `error` (object, optional): The error object for this field from `react-hook-form`.
- `...props`: Any other standard input attributes.

**Usage:**
```jsx
<FormField
  label="Email Address"
  type="email"
  name="email"
  register={register}
  error={errors.email}
  placeholder="you@example.com"
/>
```

## Button

A styled button with hover and tap animations.

**Props:**
- `children` (node, required): The content of the button.
- `type` (string, optional, default: 'button'): The button type (e.g., 'button', 'submit').
- `onClick` (function, optional): The click event handler.
- `disabled` (boolean, optional, default: false): Disables the button.
- `className` (string, optional): Additional CSS classes.
- `...props`: Any other standard button attributes.

**Usage:**
```jsx
<Button type="submit" className="w-full">
  Submit
</Button>
```

## Card

A styled container card with an entry animation.

**Props:**
- `children` (node, required): The content of the card.
- `className` (string, optional): Additional CSS classes.
- `...props`: Any other standard div attributes.

**Usage:**
```jsx
<Card className="my-4">
  <p>Card content goes here.</p>
</Card>
```
