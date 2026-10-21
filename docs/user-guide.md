# Revenue Execution user guide

Revenue Execution adds five read-only dashboards to Salesforce: Revenue Overview, Pipeline Schedule, Sales Outcomes, Product Overview, and Team Performance. They read the Opportunities you can already see and change nothing. This guide explains what each view shows and what its words mean. Administrators set it up with the [Admin guide](admin-guide.md).

- [Controls on every dashboard](#controls-on-every-dashboard)
- [Revenue Overview](#revenue-overview)
- [Pipeline Schedule](#pipeline-schedule)
- [Sales Outcomes](#sales-outcomes)
- [Product Overview](#product-overview)
- [Team Performance](#team-performance)
- [Deal Alerts](#deal-alerts)
- [Words we use](#words-we-use)
- [When something looks wrong](#when-something-looks-wrong)

## Controls on every dashboard

- **About this view (ⓘ):** three lines on what the page shows, and a link to its section here.
- **Context line:** top left. It names your view, the period, and the date the figures were read.
- **View:** **My results** shows deals credited to you. **Team**, **Leadership**, and **Executive** show every deal you can already see; they are labels for how you look, never extra access.
- **Period:** Current quarter, Year to date, or Last 12 months; Sales Outcomes and Product Overview add **Custom**. Salesforce's own date decides today, in calendar or fiscal quarters as your administrator chose.
- **Person:** outside My results, pick one person to see only their deals. The choice follows you across the four dashboards with a picker in this browser tab; My results clears it.
- **Setup notes:** a short list of anything switched off or unavailable, and why. Nothing is guessed to fill a gap.
- **Data notes:** at the foot of each dashboard: where its figures come from.
- **— (a dash):** a value is withheld, not zero. Amounts are withheld when your company uses more than one currency (counts stay exact) or when values are missing.
- **Refresh:** when an administrator changes a setting, a message asks you to refresh. Figures never change under you.

## Revenue Overview

The first page: where pipeline stands today and how closed deals went.

- **Open pipeline:** the value of open deals as of today. It is pipeline, never booked or recognized revenue.
- **Past due:** open deals whose close date has passed. **Review** opens Pipeline Schedule. Deals with no date are counted apart.
- **Booked value:** the value of deals won in the period. It is the deal amount, not recognized revenue.
- **Win rate:** won deals divided by all deals closed in the period. It also shows lost deals and their value.
- **Closed-deal flow:** won and lost bars by month, with the same counts as the table beneath it. A month still in progress reads "(partial)". **View all** opens Sales Outcomes.

Open pipeline is a snapshot of today, while won and lost follow the period you pick, so the two are never added together.

## Pipeline Schedule

Which open deals need action, who owns them, and when they close.

- **Cards:** the portfolio in the chosen date range, **Past due**, **Current quarter**, and **Next quarter**, each with a deal count and value.
- **Closing periods:** deals and value by quarter. Set **From** and **Through**, or pick a Period.
- **Filters & focus:** timing (how soon deals close, past due, no date), signals (customer risk tags and missing next steps), stage, account, segment, and deal size. Active filters stay visible as chips; **Clear all** removes them and keeps your view.
- **Status:** open deals sort into **Escalated**, **At risk** (past due, or a High or Critical risk tag) and **On track**, each deal once, so the three add up to your pipeline. Open a section to see its 20 largest deals; **Show 20 more** goes up to 100.
- **Search:** type part of a deal or account name to narrow every figure.
- **Owner groups:** choose **Group by** to see each person credited with deals, with their exact count and total.
- **Each deal:** close date, stage, days past due, next step, and up to five products. Click the deal name to open the record.
- **Timeline:** Quarters, Months, or Year. Blue marks the deal window from start to close; red extends a past-due deal to the dashed Today line; a diamond marks a recorded close-date change. **Cards** shows each deal as "Step N of M to Closed Won".

A deal is **past due** when it is open and its close date is before today. Closed deals are never past due. Risk tags are set by your company; they are signals, not predictions.

## Sales Outcomes

How closed deals went in the period: only won and lost deals count.

- **Cards:** **Won**, **Lost**, **Win rate** ("N won of D closed", or **Small sample** with its counts), and **Booked value** (deal amounts, not recognized revenue).
- **Closed-deal flow:** won and lost bars by month, with a monthly table beneath.
- **Closing detail:** **Avg. days to win** (start date to close, won deals) and **Avg. observed push** (how far close dates moved later, from the history Salesforce kept).
- **By current owner:** outside My results, each person's won of closed; a name applies that person.
- **By product:** closed, won, and lost deals per product; **View lost deals** lists them.
- **Filters:** account, segment, deal size, and product.
- **Close reasons:** switch from **Overview** to see lost and won deals by the reason your team recorded: "15 of 48" for each reason, **Not recorded** last, and the value when your company uses one currency. One line compares the period before. A reason is what the deal records now, not a verified cause.

These figures describe what happened, never a ranking or score. The current owner may not be the owner at close.

## Product Overview

What is selling, what is losing, and which products need help.

- **Cards:** Won, Lost, Open, and Past due product-line value. "n deals · m products" are separate counts: one deal can hold several products.
- **Product portfolio:** Family › Product line › Product, in money, each value with a bar on one scale. Click a head to sort; hover a figure for its definition.
- **Product mix:** the same tree in counts and rates: **In wins**, **In losses**, **Attach rate**, **Win rate**, **Days to win**, and **Needs help** (more value lost than won, on enough closed deals).
- **A product's details:** click a product for **Lost deals containing this product**: each recorded loss reason ("3 of 5", **Not recorded** always shown), then the deals. A reason is what the deal records now, not a verified cause.
- **Pages:** **Show 10 · 25 · 100**, or pick a page.
- **Filters:** product, family, line, tier, and account.

## Team Performance

The people in your reporting line, highest won value first, with the open deals worth a conversation.

- **Who you see:** the people who report to you in Salesforce (each user's Manager), and their teams below them. If no one reports to you, you see your own page. An administrator can grant "Team Performance: all teams" for a view from the top.
- **Table:** Won, Win rate, Avg deal, Open, then Past due, Escalated, No next step, and Pushed (open deals whose close date has moved to a later month at least once). Click any column head to sort. A count above zero is amber. Under the minimum sample, win rate reads "3 of 7", never a percentage.
- **Teams:** a manager's row adds up everyone below them; the arrow opens it. Click a manager to open their team, or a person to open their page. The path at the top takes you back.
- **A person's page:** their cards, won and lost by month, closing detail, the deals behind each count, and loss reasons.
- **Deals, not people:** no numbers, scores, or averages on a person. The figures describe deals and are not for pay or employment decisions.

## Deal Alerts

Deal Alerts emails people when deals need attention. It is off until an administrator turns it on, and only administrators see its page.

- **Past due:** the owner first; later steps add their manager, then the manager's manager or someone your administrator names.
- **Next step missing:** open deals closing soon with no next step.
- **Needs help** and **Win rate under:** monthly summaries for the people your administrator chose.

If you get an alert, open the deal from the email and update its close date or next step; reminders stop once it no longer matches. **Preview** shows administrators who would get what before anything sends. Set-up and rules: [Admin guide: Deal Alerts](admin-guide.md#deal-alerts).

## Words we use

- **Pipeline:** open deals and their value. Not booked or recognized revenue.
- **Close date:** Close Date, or the date field your company chose.
- **Deal value:** Amount, or the currency field your company chose.
- **Owner credit:** the person a deal counts for: the owner, or the user field your company chose. **Unattributed** means the deal credits no one; **Restricted owner** means you can't see that user.
- **Closed:** won or lost. Win rate never counts open deals.
- **Small sample:** too few closed deals for a fair rate; the counts are shown instead of a judgement.
- **Not recorded:** the deal has no value in that field.

## When something looks wrong

- **A figure is missing or shows —:** read Setup notes. Your administrator can fix most notes in Admin / Setup.
- **"Filter to see" or "Narrow the view with a filter":** the view holds more than 2,000 deals. Every total stays exact; choose a person, an account or a shorter period to see the breakdown.
- **"Too many deals for this view":** this view holds more deals than Revenue Execution reads live. Narrow the period, team, or Account. If your organization needs the whole view, your admin can contact us at [support@opsgs.com](mailto:support@opsgs.com).
- **A deal is missing:** the dashboards show only deals Salesforce lets you see. Ask your administrator about your access.
- **Numbers changed after a setting change:** refresh the page.

Administrators: see the [Admin guide](admin-guide.md) or [Support](support.md).
