# Revenue Execution user guide

Revenue Execution adds four read-only dashboards to Salesforce: Revenue Overview, Pipeline Schedule, Sales Outcomes, and Product Overview. They read the Opportunities you can already see and change nothing. This guide explains what each view shows and what its words mean. Administrators set it up with the [Admin guide](admin-guide.md).

- [Controls on every dashboard](#controls-on-every-dashboard)
- [Revenue Overview](#revenue-overview)
- [Pipeline Schedule](#pipeline-schedule)
- [Sales Outcomes](#sales-outcomes)
- [Product Overview](#product-overview)
- [Deal Alerts](#deal-alerts)
- [Words we use](#words-we-use)
- [When something looks wrong](#when-something-looks-wrong)

## Controls on every dashboard

- **About this view (ⓘ):** three lines on what the page shows, and a link to its section here.
- **Context line:** top left. It names your view, the period, and the date the figures were read.
- **View:** **My results** shows deals credited to you. **Team**, **Leadership**, and **Executive** show every deal you can already see; they are labels for how you look, never extra access.
- **Period:** Current quarter, Year to date, or Last 12 months; Sales Outcomes and Product Overview add **Custom**. Salesforce's own date decides today, in calendar or fiscal quarters as your administrator chose.
- **Person:** outside My results, pick one person to see only their deals. The choice follows you across the four dashboards in this browser tab; My results clears it.
- **Setup notes:** a short list of anything switched off or unavailable, and why. Nothing is guessed to fill a gap.
- **— (a dash):** a value is withheld, not zero. Amounts are withheld when your company uses more than one currency (counts stay exact) or when values are missing.
- **Refresh:** when an administrator changes a setting, a message asks you to refresh. Figures never change under you.

## Revenue Overview

The first page: where pipeline stands today and how closed deals went.

- **Open pipeline:** the value of open deals as of today. It is pipeline, never booked or recognized revenue.
- **Past due:** open deals whose close date has passed. **Review** opens Pipeline Schedule. Deals with no date are counted apart.
- **Booked value:** the value of deals won in the period. It is the deal amount, not recognized revenue.
- **Win rate:** won deals divided by all deals closed in the period.
- **Closed-deal flow:** won and lost deals by month, with the same counts as the table beneath it. A month still in progress reads "(partial)".
- **Revenue signals:** lost deals and their value; **View all** opens Sales Outcomes.

Open pipeline is a snapshot of today, while won and lost follow the period you pick, so the two are never added together.

## Pipeline Schedule

Which open deals need action, who owns them, and when they close.

- **Cards:** the portfolio in the chosen date range, **Past due**, **Current quarter**, and **Next quarter**, each with a deal count and value.
- **Closing periods:** deals and value by quarter. Set **From** and **Through**, or pick a Period.
- **Filters & focus:** timing (how soon deals close, past due, no date), signals (customer risk tags and missing next steps), stage, account, segment, and deal size. Active filters stay visible as chips; **Clear all** removes them and keeps your view.
- **Owner groups:** each group is the person credited with the deal and their exact count and total. Open a group to see its deals.
- **Each deal:** close date, stage, days past due, next step, and up to five products. Click the deal name to open the record.
- **Timeline:** Quarters, Months, or Year. Blue marks the deal window from start to close; red extends a past-due deal to the dashed Today line; a diamond marks a recorded close-date change. **Cards** shows each deal as "Step N of M to Closed Won".

A deal is **past due** when it is open and its close date is before today. Closed deals are never past due. Risk tags are set by your company; they are signals, not predictions.

## Sales Outcomes

How closed deals went in the period: only won and lost deals count.

- **Win rate:** "N won of D closed". Below your company's minimum sample it shows **Small sample** with its counts.
- **Booked value and lost value:** the deal amounts of won and lost deals. Lost value is the estimated deal value, not revenue lost.
- **Average days to win:** from the deal's start date to its close, for won deals with valid dates. The card names the start date it uses.
- **Close-date push:** how far close dates moved later, from the history Salesforce kept. The earliest date it finds is not always the original commitment.
- **Closed-deal flow and monthly table:** won, lost, total closed, and win rate by month.
- **Filters:** account, segment, deal size, and product.
- **By product:** closed, won, and lost deals and product value per product; **View lost deals** lists them. Outside My results, rows group by current owner; a name applies that person.

These figures describe what happened. They are never a ranking or a score for any person, and the current owner may not be the owner at close.

## Product Overview

What is selling, what is losing, and which products need help.

- **Cards:** Won, Lost, Open, and Past due product value. "n deals · m products" are separate counts: one deal can hold several products.
- **Product portfolio:** Family, then Product line, then Product. Won, Lost, and Open share one scale, so products add up to their line and family. Click a column head to sort; hover any figure for its definition and exact value.
- **Needs help:** a product lost more value than it won (more deals, when amounts are withheld) with enough closed deals to count.
- **Product mix:** for each product, how often it is in wins and losses, its attach rate, win rate, and days to close.
- **Lost deals:** largest first, with each deal's products and recorded loss reason. A reason is what the deal records now, not a verified cause.
- **Filters:** product, family, line, tier, and account.

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
- **A deal is missing:** the dashboards show only deals Salesforce lets you see. Ask your administrator about your access.
- **Numbers changed after a setting change:** refresh the page.

Administrators: see the [Admin guide](admin-guide.md) or [Support](support.md).
