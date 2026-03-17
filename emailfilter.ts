/** 
 We want to extract all emails from the following array of strings.  Each string seems to be an address info, which also contains emails. Some addresses might miss the email. We need to ultimately have an array of emails where they are all in lowercase.

*/
import assert from 'assert';

const emails = [
  '34, brighten street, email: BS@sft.com',
  'Behind hotel paragon, rode street, micHel@sun.it',
  'ulef court, cown street, email:cown@street',
  'CodeCraft'
];

const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;

const emailsF = emails
  .filter((email) => emailRegex.test(email))
  .map((email) => {
    const match = email.match(emailRegex);
    return match![0].toLowerCase();
  });

assert.deepStrictEqual(
  emailsF,
  ['bs@sft.com', 'michel@sun.it'],
  "email filtering didn't work properly"
);
