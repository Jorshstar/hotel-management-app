import { Rule } from "postcss"
import { defineField } from "sanity"

const user = {
  name: "user",
  title: "user",
  type: "document",
  fields: [
    defineField({
      name: "isAdmin",
      title: "is Admin",
      type: "boolean",
      description: "check if the user is Admin",
      initialValue: false,
      validation: (Rule) => Rule.required(),
      //readOnly: true,
      // hidden: true,
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the user',
      readOnly: true,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'username',
      title: 'username',
      type: 'string',
      description: 'Username of the user',
      readOnly: true,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'phonenumber',
      title: 'Phonenumber',
      type: 'number',
      description: 'Phone Number of the user',
      readOnly: true,
      validation: Rule => Rule.required().custom(value => typeof value === 'string' && /^[0-9]+$/.test(value) ? true : 'Phone number must contain only numbers'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'url',
    }),
    defineField({
      name: 'password',
      type: 'string',
      hidden: true,
      validation: Rule => Rule.required().min(8).error('Password must be at least 8 characters long')
    }),
    defineField({
      name: 'confirmpassword',
      type: 'string',
      hidden: true,
      validation: Rule => Rule.custom((value, { parent }) => {
        if (typeof parent === 'object' && parent !== null && 'password' in parent) {
          if (value !== parent.password) {
            return 'Passwords do not match';
          }
        }
        return true;
      }).error('Passwords do not match'),
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'text',
      description: 'Tell us  a little about yourself',
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      validation: Rule => Rule.required().email().error('Please enter a valid email address'),
    }),
    defineField({
      name: 'emailVerified',
      type: 'datetime',
      hidden: true,
    }),



  ]
}

export default user