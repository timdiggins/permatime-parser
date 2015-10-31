## Permatime-parser

A javascript parser for permatimes such as:

Practical permatime examples

http://permatime.com/US/Central/2008-12-04/11:00/37signals_live?link=http://live.37signals.com
http://permatime.com/US/Central/2009-01-12/11:00/Next_teleconference

Historical permatimes

http://permatime.com/Europe/London/2012-07-27/12:00/Opening_Ceremony
http://permatime.com/Europe/Berlin/1989-11-09/00:01/Berlin_wall
http://permatime.com/US/Central/1963-11-22/12:30/Assassination_of_JFK

## What is a permatime?

See http://www.permatime.com


## Construction

Constructing Permatime URLs from your own application or even by hand is easy. They have five parts:

* `Host`: permatime.com
* `Location`: Europe/Berlin(See all)
* `Date`: 1976-12-01 (Note that you need leading zeros for single digit months/days)
* `Time`: 00:30 (Again you need leading zeros for single digit hours/minutes)
* `Optional label`: My_Label
* `Optional link`: ?link=http://myblog.com

Full url:
http://permatime.com/Europe/Berlin/1976-12-01/00:30/My_Label?link=http://myblog.com

You can also use unix time stamps in a Permatime URL:

* `Host`: permatime.com
* `Timestamp`: timestamp/1226183760
* `Optional label`: My_Label

Full url:
http://permatime.com/timestamp/1226183760/My_Label

## Development
   
   you need git, npm, node etc.
   
   ```
   git clone ...
   npm install
   bower install
   npm start
   ```
   
   edit the src, and npm should magically make the static stuff. Being lazy, I'm just checking that into the repo for 
   now, as it means a no-build deploy.



