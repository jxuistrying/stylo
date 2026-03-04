Concept Check — Routing:

You created src/app/dashboard/page.tsx. What URL does this map to and why?
If you wanted to create a page at /dashboard/settings/profile, what folders and files would you need to create?
this url maps to the dashboard page and page.tsx is the home page for the dashboard page

to create a page at /dashboard/settings/profile i would have to create a settings folder and a file called profile.tsx in that folder

What happens if a user visits /about but you never created that folder? What does Next.js do?
redirects to a page not found page

Concept Check — Components:
4. What is a React component in your own words? Why not just write all the HTML in one big file?
a react component is like a building block you can reuse and stack together in the root page or layout page im not sure which but its better than writing all html in one file becuase it can be reused across different files making writing the code easier

5. You put <Navbar /> inside layout.tsx. Why does the navbar now show on every page? What is {children} doing in that file?
the layout is frames every page and children reffers to the current page the user is on and adds the code from that page

6. What's the difference between <Link href="/login"> from Next.js and a regular <a href="/login"> tag?
link makes its so the page doesnt refresh if its routed to another page i think its because it uses javascript to load the page

Concept Check — Styling:
7. Look at your dashboard grid: grid grid-cols-1 md:grid-cols-3 gap-6. In your own words, what does each of those three classes do? What does the md: prefix mean?
grid is a 2d layout and i think grid-cols-1 is the column spacing for the margin and gap is space between children components 

Build It Yourself Test:
8. Without looking at your existing code or using AI, could you create a brand new component called Footer.tsx that shows "© 2026 Stylo" centered at the bottom of every page? Describe the steps you'd take — what file you'd create, what you'd write in it, and where you'd import it.

create table inspiration_images (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  image_url text not null,
  title text,
  created_at timestamp with time zone default now()
);


create table wishlist_items (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade,
    product_name text not null,
    price integer,
    store_url text,
    created_at timestamp with time zone default now()
);