# Revenue Execution admin guide

> **Not yet published.** Revenue Execution is not on AppExchange and has no installation package yet. Items marked **Publish blocker** must be resolved before this guide goes to customers. Installed, every component Revenue Execution adds carries the `OpsGS` namespace, as written here (`OpsGS__Revenue_Risk__c`); a setting whose value names one stays unprefixed, as shipped (`Revenue_Risk__c`). This guide is hosted at [revenue.opsgs.com](https://revenue.opsgs.com/admin-guide.html), which Admin / Setup links to; Viewers have the [User guide](user-guide.md).

Follow the sections in order:

1. [Before you install](#before-you-install)
2. [Install](#install)
3. [Grant access](#grant-access)
4. [Get started and Health](#get-started-and-health)
5. [Map your fields](#map-your-fields)
6. [Risk tags](#risk-tags)
7. [Verify](#verify)
8. [Roll out](#roll-out)
9. [Deal Alerts](#deal-alerts)
10. [Troubleshooting](#troubleshooting)
11. [Get help](#get-help)

To point someone at a step, name the section and subsection, for example "Admin guide: Map your fields > Outcome date". Record your decisions in the [configuration worksheet](configuration-worksheet.md).

## Before you install

Revenue Execution adds four read-only dashboards (Revenue Overview, Pipeline Schedule, Sales Outcomes, and Product Overview) and administrator-only Admin / Setup and Deal Alerts pages.

1. **Check your edition.** You need Lightning Experience and an edition that runs Apex and custom metadata types, such as Enterprise, Unlimited, or Developer Edition. **Publish blocker:** the supported-edition list is not yet confirmed.
2. **Check your admin access.** You need Download AppExchange Packages (to install), Customize Application, View Setup and Configuration, Assign Permission Sets, and Manage Profiles and Permission Sets (for your field-access permission set, tab visibility, and permission set groups). A System Administrator has all five.
3. **Check your data.** The dashboards read Opportunities with their Accounts and owners. Product Overview and product detail also need Products, price books, and Opportunity Products.
4. **Choose quarters.** Calendar quarters are the default. To use Salesforce fiscal quarters, check Setup > Company Settings > Fiscal Year. With a standard fiscal year, the start month is all you need. With custom fiscal years, define the year covering today, and the next one before the current quarter ends.
5. **Know the currency rule.** If multiple currencies are enabled, every dashboard hides combined amounts and keeps counts exact; Pipeline Schedule still shows each deal's own amount and currency. Revenue Execution does not convert currencies. Product Overview's Needs help then compares lost and won deal counts.
6. **Start in a sandbox.**
7. **Know what it never does.** The dashboards are read-only:
   - They never create, edit, or delete records (including Tasks), send email or notifications, call an outside service, run scheduled or background jobs, or change sharing, profiles, or permission sets.
   - Revenue Execution writes only its own settings, when an administrator you have allowed saves them in Admin / Setup or [Deal Alerts](#deal-alerts); once Deal Alerts is on, it also writes its send log and sends its emails. Setup still works if you would rather save there.
   - Every query runs as the viewing user, with that user's sharing and object and field access. Salesforce computes every figure; the browser only displays it.
   - Otherwise, Admin / Setup only reads your setup and reports on it.
8. **Know what it adds.**
   - The **Revenue Execution** app, with tabs Revenue Overview, Pipeline Schedule, Sales Outcomes, Product Overview, Opportunities, Admin / Setup, and Deal Alerts.
   - Permission sets **Revenue Execution Viewer** (`OpsGS__Revenue_Execution_Viewer`), **Revenue Execution Configuration Health** (`OpsGS__Revenue_Execution_Config_Health`) for the Admin / Setup tab, and **Revenue Execution Mapping Editor** (`OpsGS__Revenue_Execution_Mapping_Editor`), which grants only the class that saves mappings and is assigned to no one. No permission set group is included.
   - Custom permission **Revenue Execution Edit Mappings** (`OpsGS__Revenue_Execution_Edit_Mappings`), granted by none of the included permission sets.
   - Custom metadata type **Revenue Execution Setting** (`OpsGS__Revenue_Execution_Setting__mdt`) with one record, **Default**, and **Revenue Risk Tag** (`OpsGS__Revenue_Risk_Tag__mdt`) with four inactive records.
   - Opportunity picklist fields **Required Response** (`OpsGS__Required_Response__c`), **Escalation State** (`OpsGS__Escalation_State__c`), and **Revenue Risk** (`OpsGS__Revenue_Risk__c`). No page layouts and no Product fields are included.
   - Deal Alerts components, off and assigned to no one: the **Deal Alerts** tab (`OpsGS__Deal_Alerts`); custom metadata types **Deal Alert Rule** (`OpsGS__Deal_Alert_Rule__mdt`, three inactive samples) and **Deal Alert Setting** (`OpsGS__Deal_Alert_Setting__mdt`, record **Default**); objects `OpsGS__Deal_Alert_State__c`, `OpsGS__Deal_Alert_Run__c`, and `OpsGS__Deal_Alert_Notice__c`; permission sets `OpsGS__Revenue_Execution_Deal_Alerts` (the tab, its read class, and read) and `OpsGS__Revenue_Execution_Deal_Alerts_Manager` (the save class, and create, edit, and delete on those three objects only); and custom permission `OpsGS__Revenue_Execution_Manage_Deal_Alerts`, granted by none of the included permission sets.

## Install

**Publish blocker:** no installation link exists yet. Until the package is released, Revenue Execution is available only as source metadata that a Salesforce developer deploys. After that deployment, continue at [Grant access](#grant-access). A source deployment runs Apex tests that create fictional Opportunities and roll them back, so validation rules or automation that block new Opportunities can stop it.

When the package is released:

1. Log in to the target org (a sandbox first) as a System Administrator.
2. Open the Revenue Execution installation link.
3. Choose **Install for Admins Only**. You grant everyone else access in the next section.
4. Review the package details and terms, then click **Install**.
5. After the confirmation email arrives, check that Revenue Execution appears in Setup > Apps > Packaging > Installed Packages.

## Grant access

Admin / Setup > **Get started** lists this work in order: check the core fields ([Map your fields](#map-your-fields)), assign Viewers, then grant field access.

Revenue Execution Viewer is designed to grant the app, the four dashboard tabs and their Apex classes, Read on Account, Opportunity, Opportunity Product, Price Book, and Product, and Read on the three included Opportunity fields and some Product and Opportunity Product fields. It never grants Edit. Revenue Execution Configuration Health grants only the Admin / Setup tab and its Apex class. Revenue Execution Mapping Editor grants only the Apex class that saves mappings: no tab, no data, no system permission.

1. **Assign the Viewer to dashboard users.** Setup > Users > Permission Sets > Revenue Execution Viewer > Manage Assignments > Add Assignment. Select the sellers, managers, and executives who use the dashboards, click **Next**, then click **Assign**.
   - Or add Revenue Execution Viewer to a permission set group your org owns (Setup > Users > Permission Set Groups > your group > Permission Sets in Group > Add Permission Sets), assign the group, and wait until its status is Updated.
2. **Assign administrators.** Assign both Revenue Execution Viewer and Revenue Execution Configuration Health to administrators who hold View Setup and Configuration. Assign Revenue Execution Configuration Health to no one else: only its holders see Admin / Setup, unless a profile or permission set shows the tab; Health warns when one lacks View Setup and Configuration. **Publish blocker:** confirm whether Install for Admins Only gives administrator profiles this page's Apex classes and tab.
   - **Optional: let an administrator save settings in Admin / Setup.** Also assign Revenue Execution Mapping Editor, and grant that administrator the Revenue Execution Edit Mappings custom permission through a permission set your org owns (Custom Permissions > Edit). Saving there also needs a full Salesforce licence and **Modify Metadata Through Metadata API Functions**, which itself requires View Setup and Configuration and View Roles and Role Hierarchy. Without any of this, everything still works through Setup.
3. **Leave the included permission sets unchanged.** Don't edit or clone them. Health reports a Fail if Revenue Execution Viewer, Configuration Health, or Mapping Editor gains access or loses its app, tabs, classes, or object reads. Health also checks the two Deal Alerts sets, who holds them, and who else shows their tab. Give any extra access through a permission set your org owns.
4. **Grant field access with your own permission set.** Setup > Users > Permission Sets > New. Enter a label, for example Revenue Execution Field Access, leave License as --None--, and click **Save**. Then:
   1. Object Settings > Opportunities > Edit. Under Field Permissions, select **Read Access** for Next Step (unless you map Next step to another field), Amount (unless you map Deal value to another field), and every Opportunity field you map in [Map your fields](#map-your-fields) or use in a [risk tag](#risk-tags) that Revenue Execution didn't add. Click **Save**.
   2. Object Settings > Products > Edit. Select **Read Access** for each Product field you map. Click **Save**.
   3. Object Settings > Accounts > Edit. Select **Read Access** for the Account segment field, if you map one. Click **Save**.
   4. If Salesforce asks, allow Read on the object. Never grant Edit, View All, or Modify All here.
   5. Assign this permission set to the same users as the Viewer, or add it to the same group.
5. **Verify standard object and field reads.** Don't assume them; check them:
   1. Make sure at least one dashboard user other than you holds the Viewer.
   2. Open Admin / Setup > **Health**, choose **All**, and click **Recheck**.
   3. Under Access and assignment, confirm that "Revenue Execution Viewer is as shipped" and "All … checked Viewers can read every field" (or "The checked Viewer can read every field") show Pass. "Only you have Revenue Execution Viewer" means no Viewer was checked: administrators read every field.
   4. If a "… fields need Viewer read access" row lists fields, grant Read Access on them in step 4, then Recheck.
   5. If a row still fails, follow [Troubleshooting > Access and assignment](#access-and-assignment).

   **Publish blocker:** it is not yet verified that a package install carries the Viewer's standard object and field reads.

## Get started and Health

1. **Open it.** From the App Launcher, search for **Admin / Setup**. If you also hold Revenue Execution Viewer, it follows Opportunities in the Revenue Execution app. It opens on **Get started** until setup is ready, then on **Configure Fields**.
2. **Work through Get started.** Four steps count toward "… of 4 done": Check core fields, Assign Viewers, Give Viewers field access, and Fix remaining issues. Choose optional fields and Deal Alerts are optional. **Next** marks the step to do now and its Health row or setting. **Show how** opens the steps (for field access, also the fields to grant) with **Copy**; **Review** opens the setting or Health row. **Waiting** means an earlier step or your access comes first; "Too many permission entries to check here" means check it by hand ([Troubleshooting](#troubleshooting)). When all four are done it reads **You're ready**; a later problem brings the steps back.
3. **Check your access.** Health runs as you. Access checks need View Setup and Configuration; without it, rows end "can't check with your access".
4. **Pick a view.** Besides **Get started**, **Configure Fields** shows each setting, what it is for, where it shows up, and a field list or values ([Use Configure Fields](#use-configure-fields)). **Health** lists every check below.
5. **Read the Health line.** Under the Health heading, it shows the date checked and how many Viewers were checked: up to 25 recent Viewer holders, never named.
6. **Read the counts.** The summary shows how many rows are Fail, Warning, Info, and Pass.
7. **Choose a filter.**
   - **Needs attention** (the default) shows every Fail and Warning, rows Health couldn't fully check, and Info rows that still need an action: field-access gaps before a Viewer other than you is checked, a Viewer whose actual access differs, permission set groups not yet recalculated, and you as the only Viewer. With none, it reads "Nothing needs attention."
   - **All** shows every row, including Pass and Info rows that carry steps and optional features that are off. Use All before you sign off.
8. **Read each status.**
   - **Fail:** a dashboard is blocked, or a permission set doesn't match what Revenue Execution expects. Fix these first.
   - **Warning:** a feature is hidden or degraded. Fix it or turn the feature off.
   - **Info:** a fact or a choice. Some Info rows carry steps.
   - **Pass:** checked and working.
9. **Read the basis note** when a row has one.
   - "Could not verify with your access": get View Setup and Configuration, then Recheck.
   - "Not fully checked": the row was skipped or cut short to stay within Salesforce limits. A row ending "not checked this time" needs only a Recheck; one ending "too many entries to check" repeats on every Recheck, so check it by hand ([Troubleshooting](#troubleshooting)).
   - "Not applicable until the prerequisite above is fixed": fix the earlier row, then Recheck.
10. **Read the row.** Rows are grouped by area, Access and assignment first, and start collapsed to their status, a short title saying what is wrong, and how many **To fix** steps they hold (for example "3 steps"); click one, or press Enter or Space, to open it. **To fix** comes first: the action, the Setup path, then Recheck. Then come the settings and fields it acts on (Configuration; fields by label), the impact, and the dashboards affected. **Details** names the guide section; **Open setting** opens that setting's card in Configure Fields.
11. **Recheck after every change.** Health always reads fresh. Dashboards cache their figures, so Viewers refresh their page after a fix.

## Map your fields

Every setting is a field on one record, the Default Revenue Execution Setting.

- **Default setting path:** Setup > Custom Metadata Types > Revenue Execution Setting > Manage Records > Default > Edit. In Quick Find, enter Custom Metadata Types.
- **Finding a field's API name:** Setup > Object Manager > Opportunity (or Product, or Account) > Fields & Relationships. The Field Name column shows the API name, such as `CloseDate` or a custom field ending in `__c`.
- Enter the API name only: no object prefix, no relationship path such as `Account.Name`, and no spaces.
- Viewers see the label settings. Use plain business wording, up to 80 characters.
- On Save, Setup rejects invalid deal-size bands, close-timing days, and sample sizes. Health checks the rest.
- Grant Viewers Read Access on every field you map that Revenue Execution didn't add ([Grant access](#grant-access), step 4).
- After each Save, click **Check saved value** in Configure Fields (or Recheck in Health), record the change in the [configuration worksheet](configuration-worksheet.md), and ask Viewers to refresh.
- Each **Health** line names the Health area and how the row's short title starts.

### Use Configure Fields

Configure Fields helps you choose fields and settings, and saves them when your user may; otherwise save them in Setup.

1. **Open it.** In Admin / Setup, choose **Configure Fields**. Core settings come first; the rest are grouped by the dashboard they mainly affect. Each card starts collapsed, showing its name, status, and current value; click it, or press Enter or Space, to open it, and several can stay open. An open card shows what the setting is for, its current value, **Where it shows up**, and what happens when it is blank or off. A card also opens when **Open setting**, a Preview, or a Save result points to it.
2. **Choose a field.** Click the field box or its arrow, or press Down Arrow, to list every field that passes that dashboard's own checks: label, API name, type, and how many checked Viewers can read it. Type to narrow it; use the arrow keys and Enter to choose, and Escape to close. **Not listed?** explains why other fields you can read don't qualify. Fields you can't read appear only if you have View Setup and Configuration (never for Deal value, Pipeline date, or Owner credit).
3. **Choose a setting.** Quarter basis, Close history, Escalation manager, and Pipeline products list the values Setup offers, with the current one selected. Press Tab to reach the list and the arrow keys to pick a value, or click one. **Undo** returns to the saved value.
4. **Labels.** Type the wording you want in the label box next to the field, up to the character limit it shows; leave it alone to keep what is there. An empty box is not accepted: to clear a label, turn its field off, or clear it in Setup. If a label is blank and you type nothing, the steps propose the field's own label. Labels appear on the dashboards, and Salesforce records label changes in the Setup Audit Trail in plain text.
5. **Preview.** Preview checks all your choices together, including an outcome start date that matches the outcome date or a Product family that matches Product line, and warns if a choice would stop a dashboard from loading. Choosing Salesforce fiscal quarters also checks your fiscal periods; if they need attention, see [Periods](#periods). If a choice is unusable, Preview names the setting; undo it or choose again. For each field you change, it also shows how many of the records you can see have a value now and with your choice, for example "412 of 530 open deals have a value", and where the rest would show. "Only you have Revenue Execution Viewer" means no real Viewer was checked yet.
6. **Save.** If your user can save here, **Save** lists each setting's prior and new value; click **Save these changes** to write them, or **Cancel** to go back. Save stays off while a change would stop dashboards for Viewers, such as a deal value field they can't read; grant the access Preview lists, then Preview again. Save stays off until that save is checked, usually within seconds. The result names what happened; see [Saving in Configure Fields](#saving-in-configure-fields). **Undo this save** puts back every previous value it can, and **Restore previous value** one setting, through the same preview and save; a value this page can't list is restored in Setup (for an explicit Amount, Close Date, Owner, Next Step, or Product Family, the blank option does the same). Otherwise use **Save in Setup**, which lists the Setup path and, for each change, the setting's label and API name, what to enter or choose (a setting's value as Setup shows it, with its API value), the prior value, and a **To undo** list. Click **Copy steps**, or select the text if copying isn't allowed. Keep this page open while you save.
7. **Check saved value.** It confirms each saved value and, once all are saved, reloads the cards. If you left the page, or for other settings, use **Health**.
8. **Ask Viewers to refresh** open dashboards.

Deal-size bands, close timing, sample size, and risk tags show where they appear but never their values; edit them in Setup. Stage has no card: it follows your Salesforce stage setup. To roll stages into your own phases, use [Stage group](#stage-group).

### What Viewers see after a change

- **The dashboards use your names.** Filters, column headers, and row labels show each field's own label from your org, and picklist filters show your own value labels. Where a setting has a label, that label wins (one exception under [Outcome date](#outcome-date)). The English names in this guide are the defaults a new Salesforce org ships with, not a promise: after you rename Owner to Account Executive, the filter this guide calls Owner reads Account Executive. Search by what a control does, not only by its name here.
- Stage always shows your label; a [stage group](#stage-group) only regroups it. Stage colors on Pipeline Schedule follow each stage's won status and forecast category in your stage setup, never its name.
- **Viewers can focus on one person.** In Team, Leadership, and Executive, each dashboard has a person picker named after your [Owner credit](#owner-credit) field. The person stays chosen across the dashboards in that browser tab; My results clears it.
- **Open pages say a setting changed.** After you save in Setup, anyone with a Revenue Execution page already open sees "A Revenue Execution setting changed. Refresh to use the new configuration." next to a **Refresh** button. No figure, filter, or name on that page moves until someone presses Refresh, so nobody's numbers change under them mid-task. Admin / Setup shows the same notice; its Refresh is the Recheck you already use.
- If you put a setting back the way it was before anyone pressed Refresh, the notice goes away by itself.

### Deal value

- **Controls:** which Opportunity field every dashboard reads as a deal's value.
- **Shows up:** the Deal size filter and every deal amount: Pipeline Schedule totals, period and closing-quarter amounts, and deal rows; Sales Outcomes Booked value, won deal-size figures, and lost opportunity value; Product Overview lost-deal amounts in Product mix; Revenue Overview Open pipeline, Past due, Booked value, and Average won deal. Dashboards name it with the field's own label.
- **Accepts:** Amount, or a custom Opportunity Currency field, such as an ARR field, that can be filtered and totaled and is not a formula or roll-up summary. Every other standard field, Expected Revenue included, is rejected.
- **Default:** blank, which uses Amount.
- **If blank or invalid:** an invalid field blocks every dashboard for every Viewer. A Viewer who can't read the field gets an access message instead, so grant Read Access first ([Grant access](#grant-access), step 4).
- **After you change it:** check that the [deal-size bands](#deal-size-bands), which keep their amounts, still suit it. With multiple currencies, totals stay hidden as before.
- **Health:** Settings, "Deal value uses …" or "Deal value needs a new field". Configure Fields lists only fields you can read.
- **Edit:** Default setting > Deal Value Field API Name (`OpsGS__Deal_Value_Field_API_Name__c`).

### Owner credit

- **Controls:** who gets credit for each deal.
- **Shows up:** My results, the person picker, and owner groups and filters on every dashboard; the Sales Outcomes By current owner table; the owner column of Sales Outcomes lost-deal lists and the lost-deal tooltips in Product Overview's Product mix (never in My results); and the [escalation manager](#escalation-manager). Dashboards name it with the field's own label.
- **Accepts:** Owner, or a custom Opportunity lookup to User, such as a credited rep, that can be filtered and grouped. Lookups to other objects and every other standard field, Created By included, are rejected.
- **Default:** blank, which uses Owner.
- **If blank or invalid:** an invalid field blocks every dashboard for every Viewer. A Viewer who can't read the field gets an access message instead, so grant Read Access first ([Grant access](#grant-access), step 4).
- **After you change it:** deals crediting no one show as **Unattributed**. Record access still follows Owner and your sharing, so My results counts only the credited deals each Viewer can see.
- **Health:** Settings, "Owner credit uses …" or "Owner credit needs a new field"; Sharing, "My results follows …". Configure Fields lists only fields you can read.
- **Edit:** Default setting > Owner Credit Field API Name (`OpsGS__Owner_Credit_Field_API_Name__c`).

### Pipeline date

- **Controls:** each deal's expected close date.
- **Shows up:** Pipeline Schedule dates, past due, periods, Close timing, and order; Revenue Overview and Product Overview past due.
- **Accepts:** Close Date, or a custom Opportunity Date (not Date/Time) field that can be filtered, sorted, grouped, and totaled and is not a formula.
- **Default:** blank, which uses Close Date.
- **If blank or invalid:** an invalid field blocks Pipeline Schedule, Product Overview, and Revenue Overview; a Viewer who can't read it gets an access message. Sales Outcomes opens, with observed push Not tracked.
- **After you change it:** empty values count in totals, are never past due, and show under **No date** (never with a date range). Close history isn't tracked. Pipeline Schedule's Closed Won deals follow it; Sales Outcomes keeps the outcome date.
- **Health:** Settings, "Pipeline date uses …" or "Pipeline date needs a new field".
- **Edit:** Default setting > Pipeline Date Field API Name (`OpsGS__Pipeline_Date_Field_API_Name__c`).

### Outcome date

- **Controls:** which Opportunity date places a closed deal in a period.
- **Shows up:** Sales Outcomes periods and Data notes; Product Overview closed-deal periods; Revenue Overview closed outcomes and Data and metric notes. The label appears in those notes. Product mix's lost-deal date column shows the field's own label, with this label in its tooltip, the Days to close and Days tooltips, and Metric and data notes.
- **Accepts:** a direct Opportunity Date or Date/Time field that is filterable and not a formula, plus a label.
- **Default:** `CloseDate`, labeled "Current Opportunity Close Date". Close Date is editable, and the dashboards say so.
- **If blank or invalid:** both settings are required. A blank, invalid, or unreadable field blocks Sales Outcomes, Product Overview, and Revenue Overview.
- **Health:** Outcome and product mappings, "Outcome date …".
- **Edit:** Default setting > Outcome Date Field API Name (`OpsGS__Outcome_Date_Field_API_Name__c`) and Outcome Date Label (`OpsGS__Outcome_Date_Label__c`).

### Outcome sample size

- **Controls:** how many deals a figure needs before Sales Outcomes and Revenue Overview drop its small-sample caution, and how many closed deals Product Overview needs before a row shows a win rate or Needs help, or Product mix shows shares.
- **Shows up:** Sales Outcomes cautions, such as "Minimum sample 5 closed deals"; Product Overview win rates and Product mix shares shown as "2 of 3", Product mix days to close marked as a small sample, and the Needs help label, which compares deal counts when multiple currencies are enabled.
- **Accepts:** a whole number from 1 through 1000.
- **Default:** 5.
- **If blank or invalid:** required. An invalid value blocks Sales Outcomes and Revenue Overview; Product Overview opens without Needs help. Pipeline Schedule is unaffected.
- **Health:** Settings, "Outcome sample size …".
- **Edit:** Default setting > Outcome Minimum Sample Size (`OpsGS__Outcome_Minimum_Sample_Size__c`).

### Quarter basis

- **Controls:** whether quarters and years follow the calendar or your Salesforce fiscal year.
- **Shows up:** Pipeline Schedule's this-quarter and next-quarter figures and its closing-quarter strip; the Current quarter and Year to date periods on every dashboard.
- **Accepts:** Calendar quarters (`CALENDAR`) or Salesforce fiscal quarters (`ORG_FISCAL`). Fiscal quarters use Setup > Company Settings > Fiscal Year: a standard fiscal year needs only its start month; custom fiscal years need the year covering today, and the next one defined before the current quarter ends.
- **Default:** Calendar quarters.
- **If blank or invalid:** required, and Setup offers only the two choices. An invalid value blocks Pipeline Schedule and Revenue Overview. If fiscal periods are missing, periods fall back to calendar dates labeled "calendar".
- **Health:** Settings, "Quarter basis …"; Periods (one row).
- **Edit:** Default setting > Quarter Basis (`OpsGS__Quarter_Basis__c`).

### Outcome start date

- **Controls:** where cycle time starts.
- **Shows up:** Sales Outcomes "Avg. days to win", in the headline figures and the owner table, and the "Start:" line in Data notes; Product Overview Product mix "Days to close" and its lost-deal Days column. Screen readers announce the label on the headline figure.
- **Accepts:** a direct Opportunity Date or Date/Time field that is not a formula and differs from the outcome date, plus a label.
- **Default:** `CreatedDate`, labeled "Opportunity created (UTC)".
- **If blank or invalid:** cycle time shows as unavailable, and Product mix leaves out Days to close. Counts and rates are unaffected.
- **Health:** Outcome and product mappings, "Outcome start date …".
- **Edit:** Default setting > Outcome Start Date Field API Name (`OpsGS__Outcome_Start_Date_Field_API_Name__c`) and Outcome Start Date Label (`OpsGS__Outcome_Start_Date_Label__c`).

### Timeline start date

- **Controls:** where each deal's Pipeline Schedule timeline starts.
- **Shows up:** the Pipeline Schedule Start marker and the start date in an expanded row. Screen readers announce the label on the marker.
- **Accepts:** a direct Opportunity Date or Date/Time field that is not a formula, plus a label.
- **Default:** `CreatedDate`, labeled "Opportunity created (UTC)".
- **If blank or invalid:** rows show "Start date unavailable". No other date is substituted.
- **Health:** Optional context, "Timeline start date …".
- **Edit:** Default setting > Start Date Field API Name (`OpsGS__Start_Date_Field_API_Name__c`) and Start Date Label (`OpsGS__Start_Date_Label__c`).

### Close history

- **Controls:** whether the dashboards show close-date changes from Opportunity history.
- **Shows up:** Pipeline Schedule close-date revision markers; Sales Outcomes "Avg. observed push".
- **Accepts:** Opportunity stage history (`OPPORTUNITY_HISTORY`), which reads close-date changes despite its label, or Disabled (`DISABLED`). Viewers read history through their Opportunity access.
- **Default:** Opportunity stage history.
- **If blank or invalid:** the markers and the push figure are hidden, with a note. Nothing is blocked.
- **Tracked only while [Pipeline date](#pipeline-date) uses Close Date.**
- **Health:** Settings, "Close-date history …" or "Close history …".
- **Edit:** Default setting > Close History Source (`OpsGS__Close_History_Source__c`).

### Required action

- **Controls:** the required-action context on Pipeline Schedule.
- **Shows up:** the Pipeline Schedule filter, line, and card strip named after this field, and the readiness filter, named after this field plus "readiness" when mapped and after your [Next step](#next-step) field plus "status" when not.
- **Accepts:** a direct, single-select Opportunity picklist field that is filterable, groupable, and not a formula.
- **Default:** `Required_Response__c` (Required Response, added by Revenue Execution).
- **If blank or invalid:** the feature is hidden, readiness uses your Next step field only (off while Next step is invalid), and Pipeline Schedule shows a setup note.
- **Health:** Optional context, "Required action …".
- **Edit:** Default setting > Response Field API Name (`OpsGS__Response_Field_API_Name__c`).

### Next step

- **Controls:** the field Pipeline Schedule reads as each deal's next step.
- **Shows up:** the Pipeline Schedule readiness filter, the Next step line on rows, and the Next section on cards, named with the field's own label.
- **Accepts:** Next Step, or a custom Opportunity text or text area field (255 characters or fewer) that can be filtered and is not a formula. Long and rich text areas, picklists, and every other standard field are rejected.
- **Default:** blank, which uses Next Step.
- **If blank or invalid:** an invalid field turns readiness off, with a note; nothing else changes. A Viewer who can't read the field loses readiness only.
- **Health:** Optional context, "Next step …".
- **Edit:** Default setting > Next Step Field API Name (`OpsGS__Next_Step_Field_API_Name__c`).

### Account segment

- **Controls:** a customer segment filter, such as industry or size.
- **Shows up:** a filter on Pipeline Schedule and Sales Outcomes, named with the field's own label, with deal counts on Pipeline Schedule. Deals with no Account, or whose Account has no value, show as **Not specified**. The Sales Outcomes product panel follows it.
- **Accepts:** a direct Account picklist or text field (255 characters or fewer) that can be filtered and grouped and is not a formula, such as Industry, Type, or your own tier. Account Name is rejected.
- **Default:** blank (off).
- **If blank or invalid:** the filter is hidden; an invalid or unreadable field adds a note on both dashboards. Totals don't change. Over 250 values also hides it.
- **Health:** Optional context, "Account segment …".
- **Edit:** Default setting > Account Segment Field API Name (`OpsGS__Account_Segment_Field_API_Name__c`).

### Stage group

- **Controls:** your own phases, each covering several stages.
- **Shows up:** Pipeline Schedule's stage buttons under Filters & focus show phases instead of stages, plus a phase filter, both named with the field's own label. Stages under no phase show last, under "No" plus that label.
- **Accepts:** an Opportunity picklist whose controlling field is Stage. Phases come from its field dependency, never its values on deals. Won, lost, and stage order always follow Stage.
- **Set it up:**
  1. Setup > Object Manager > Opportunity > Fields & Relationships > **New**: a Picklist with one value per phase. It needs no page layout; nobody fills it in.
  2. Fields & Relationships > **Field Dependencies** > **New**: choose Stage as the controlling field and your picklist as the dependent field. In each stage's column, include exactly one phase (**Include Values**), then **Save**. A stage with several phases shows under the first.
  3. Grant Viewers Read Access on it ([Grant access](#grant-access), step 4).
- **Default:** blank (off).
- **If blank or invalid:** Pipeline Schedule shows each stage on its own; nothing else changes. A Viewer who can't read the field sees stages, with a note.
- **Health:** Optional context, "Stage group …".
- **Edit:** Default setting > Stage Group Field API Name (`OpsGS__Stage_Group_Field_API_Name__c`).

### Escalation state

- **Controls:** the escalation-state context on Pipeline Schedule.
- **Shows up:** the Pipeline Schedule Escalation state filter and the Escalation line on rows and cards.
- **Accepts:** the same field types as Required action.
- **Default:** `Escalation_State__c` (Escalation State, added by Revenue Execution).
- **If blank or invalid:** the feature is hidden, with a setup note.
- **Health:** Optional context, "Escalation state …".
- **Edit:** Default setting > Escalation Field API Name (`OpsGS__Escalation_Field_API_Name__c`).

### Escalation manager

- **Controls:** grouping and filtering by the manager of each deal's credited user.
- **Shows up:** the Pipeline Schedule Escalation manager filter and the Escalation manager choice under Group by.
- **Accepts:** "Owner's manager (User.ManagerId)" (`USER_MANAGER`), which reads the Manager field on each credited user's user record ([Owner credit](#owner-credit)), or Disabled (`DISABLED`).
- **Default:** Owner's manager (User.ManagerId).
- **If blank or invalid:** required. When Disabled or invalid, both are hidden and deals group by Accountable owner.
- **Health:** Optional context, "Escalation manager …".
- **Edit:** Default setting > Manager Context Source (`OpsGS__Manager_Context_Source__c`).

### Pipeline products

- **Controls:** product detail on Pipeline Schedule. Product Overview doesn't use this setting.
- **Shows up:** the Products list on timeline rows and cards, up to five products per deal, and the product count.
- **Accepts:** Opportunity products (`OPPORTUNITY_PRODUCTS`) or Disabled (`DISABLED`). Viewers need Read on Opportunity Products and Price Books ([Grant access](#grant-access), step 5).
- **Default:** Opportunity products.
- **If blank or invalid:** required. When Disabled or invalid, product detail is hidden, with a note.
- **Health:** Optional context, "Pipeline products …"; Products, "No deals have products yet" or "Products are off".
- **Edit:** Default setting > Product Context Source (`OpsGS__Product_Context_Source__c`).

### Deal-size bands

- **Controls:** the priced choices in the Deal size filter.
- **Shows up:** the Deal size filter on Pipeline Schedule and Sales Outcomes. With the defaults: Under $50K, $50K to under $100K, $100K to under $250K, $250K and over, and Amount not set (named for your Deal value field). Currencies other than USD show the currency code.
- **Accepts:** whole amounts, with One greater than 0 and One < Two < Three.
- **Default:** 50000, 100000, and 250000. Check them after you change [Deal value](#deal-value).
- **If blank or invalid:** required. If invalid, only the not-set choice remains, with a note; totals stay exact. With multiple currencies, priced bands are always unavailable.
- **Health:** Settings, "Deal-size bands …".
- **Edit:** Default setting > Deal Band One, Deal Band Two, and Deal Band Three (`OpsGS__Deal_Band_One__c`, `OpsGS__Deal_Band_Two__c`, `OpsGS__Deal_Band_Three__c`).

### Close timing

- **Controls:** the close-timing ranges and how far the Pipeline Schedule timeline reaches.
- **Shows up:** the Pipeline Schedule Close timing filter. With the defaults: Overdue, Today–30 days, 31–60 days, 61–90 days, and 91+ days; No date with a custom Pipeline date.
- **Accepts:** whole days from 1 through 365, with One < Two < Three.
- **Default:** 30, 60, and 90.
- **If blank or invalid:** required. If invalid, only Overdue (and No date, for a custom Pipeline date) remains, with a note.
- **Health:** Settings, "Close-timing horizons …".
- **Edit:** Default setting > Horizon One Days, Horizon Two Days, and Horizon Three Days (`OpsGS__Horizon_One_Days__c`, `OpsGS__Horizon_Two_Days__c`, `OpsGS__Horizon_Three_Days__c`).

### Product family

- **Controls:** each product's family, the top level of the Product Overview portfolio.
- **Shows up:** the Product Overview Product family filter and the portfolio's first level, named with the field's own label and your picklist value labels. Products with no value show as **Not categorized**.
- **Accepts:** Product Family, or a direct Product picklist or text field (255 characters or fewer) that can be filtered and grouped and is not a formula. Name, Product Code, Product SKU, Quantity Unit Of Measure, and the field [Product line](#product-line) uses are rejected.
- **Default:** blank, which uses Product Family.
- **If blank or invalid:** never blocks. An invalid field, the Product line field, more than 250 values, or a Viewer who can't read the field turns the family level off for that Viewer: the filter is disabled and the portfolio starts at Product line, or shows one flat list without it. Totals don't change.
- **Health:** Outcome and product mappings, "Product family …".
- **Edit:** Default setting > Product Family Field API Name (`OpsGS__Product_Family_Field_API_Name__c`).

### Product line

- **Controls:** a product-line level between [Product family](#product-family) and Product.
- **Shows up:** the Product Overview Product line filter and the nested portfolio ([Product family](#product-family), then Product line, then Product; Product line, then Product while Product family is off). The label is the filter's help text.
- **Accepts:** a direct Product picklist or text field (255 characters or fewer) that is filterable, groupable, and not a formula. Name, Product Code, Product Family, Product SKU, and Quantity Unit Of Measure are rejected. Set both the field and the label.
- **Default:** blank (off).
- **If blank or invalid:** the filter is disabled and the portfolio shows one flat list. Setting only one of the two is invalid. More than 250 values turns the filter off.
- **Health:** Outcome and product mappings, "Product line …".
- **Edit:** Default setting > Product Line Field API Name (`OpsGS__Product_Line_Field_API_Name__c`) and Product Line Label (`OpsGS__Product_Line_Label__c`).

### Product tier

- **Controls:** a tier filter for products.
- **Shows up:** the Product Overview Tier filter only. The label is the filter's help text.
- **Accepts:** the same fields as Product line. Set both the field and the label.
- **Default:** blank (off).
- **If blank or invalid:** the Tier filter is disabled.
- **Health:** Outcome and product mappings, "Product tier …".
- **Edit:** Default setting > Product Tier Field API Name (`OpsGS__Product_Tier_Field_API_Name__c`) and Product Tier Label (`OpsGS__Product_Tier_Label__c`).

### Loss reason

- **Controls:** the recorded reason shown for lost deals.
- **Shows up:** Product Overview Product mix: the leading recorded reason on a Needs help product, reason counts that each open their lost deals, and a column in its lost-deal list; the Sales Outcomes product lost-deal detail, headed "Current recorded" plus this field's name.
- **Accepts:** a direct Opportunity picklist or text field (255 characters or fewer) that is filterable, groupable, and not a formula. Stage, Amount, Close Date, Next Step, Description, Name, Revenue Risk, and similar fields are rejected. Set both the field and the label.
- **Default:** blank (off).
- **If blank:** Product Overview's Metric and data notes say Loss reason isn't set up, and administrators with the Revenue Execution Edit Mappings custom permission see **Set up reasons** in Product mix, which opens Admin / Setup; Sales Outcomes says it is not configured.
- **If invalid or only one is set:** Product Overview lists it under Setup notes and Sales Outcomes shows a notice, both named with your label. Lost-deal counts and lists still show in every case.
- **Health:** Outcome and product mappings, "Loss reason …".
- **Edit:** Default setting > Loss Reason Field API Name (`OpsGS__Loss_Reason_Field_API_Name__c`) and Loss Reason Label (`OpsGS__Loss_Reason_Label__c`).

## Risk tags

A risk tag turns an Opportunity field value into a Pipeline Schedule signal. Four tags are included, all inactive and all matching Revenue Risk (`OpsGS__Revenue_Risk__c`) with Equals: Critical, High, Watch, and Low. Revenue Execution Viewer grants Read on Revenue Risk.

1. Decide whether your team will keep Revenue Risk, or another field, up to date. A tag on a field nobody maintains shows nothing useful.
2. Open Setup > Custom Metadata Types > Revenue Risk Tag > Manage Records.
3. Click **Edit** next to a tag and review each field:
   - **Label:** the chip text Viewers see, up to 40 characters.
   - **Field API Name:** a direct Opportunity picklist, number, percent, checkbox, or date field. Currency, Date/Time, and text fields are rejected.
   - **Operator:** Equals, Does not equal, Is one of (picklists only), Is blank, Is not blank, or Greater than, Greater than or equal, Less than, and Less than or equal (numbers and dates only).
   - **Match Value:** a picklist API value, a number, true or false, or a date as YYYY-MM-DD. For Is one of, enter 1 to 50 values separated by semicolons. Is blank and Is not blank ignore it.
   - **Explanation:** required, up to 255 characters. Viewers see it as the tooltip.
   - **Severity:** changes appearance only.
   - **Icon Name:** one of `utility:alert`, `utility:error`, `utility:flag`, `utility:info`, `utility:priority`, `utility:success`, or `utility:warning`.
   - **Display Order:** 0 or more. Lower numbers show first.
4. If the tag uses a field other than Revenue Risk, grant Viewers Read Access on it in your field-access permission set ([Grant access](#grant-access), step 4). A Viewer who can't read a tag's field doesn't see that tag.
5. Select **Active** and click **Save**. To add a tag, click **New** instead.
6. Keep 25 or fewer tags active. Invalid tags, and tags beyond 25, are excluded one at a time; the page still loads.
7. Recheck. Under Risk tags, "… active risk tags are valid" should show Pass.
8. Tags appear on Pipeline Schedule in the Signals group under Filters & focus, in the Customer risk filter, and in the Customer risk section of rows and cards.

To turn a tag off, clear **Active** and click **Save**.

## Verify

1. Open Admin / Setup > **Get started**: it reads **You're ready** once its four steps are done. Info rows needing no action (sharing, currency) never hold it back; an org too large to check never gets there ([Troubleshooting](#troubleshooting)).
2. Open **Health** and click **Recheck**.
3. Choose **All**.
4. Fix every Fail, then every Warning, using [Troubleshooting](#troubleshooting). Recheck after each fix.
5. Under **All**, open each Info or Pass row that shows a step count, then complete its **To fix** steps or record in the worksheet why you won't.
6. Repeat until no Fail or Warning remains and every row with steps is done or recorded.
7. Check each dashboard as a Viewer. If administrators can log in as users (Setup > Login Access Policies), open Setup > Users > Users and click **Login** next to one Viewer. Otherwise, ask one Viewer to open each dashboard and report any "Revenue Execution setup needs attention" message. None should show it.
8. Sign off in the [configuration worksheet](configuration-worksheet.md).

## Roll out

1. **Let people maintain the included fields.** Revenue Execution never writes Required Response, Escalation State, or Revenue Risk. Add the ones you use to Opportunity page layouts or Lightning record pages (Setup > Object Manager > Opportunity > Page Layouts or Lightning Record Pages). Grant Edit on them through a permission set your org owns, never through Revenue Execution Viewer. Until Required Response is filled in, Pipeline Schedule rows show "Required Response missing".
2. **Assign the remaining Viewers** as in [Grant access](#grant-access), then Recheck.
3. **Tell Viewers** about the [User guide](user-guide.md), and that the dashboards are read-only, show only what their Salesforce access allows, and need a page refresh after setup changes; in multi-currency orgs, also tell them the [currency rule](#before-you-install) (step 5).
4. **Change settings safely.** Record the prior value in the worksheet before each change, then Recheck.
5. **Roll back** by restoring prior values in the Default setting, clearing Active on tags, or removing users in Setup > Users > Permission Sets > Revenue Execution Viewer > Manage Assignments.

## Deal Alerts

Deal Alerts emails deal owners, their managers and people you choose when open deals are past due or missing a next step, and monthly when products need help or a salesperson's win rate is under your threshold. It ships off: no alert is sent and nothing is scheduled until you turn it on.

1. **Give it to administrators only.** Assign **Revenue Execution Deal Alerts** (`OpsGS__Revenue_Execution_Deal_Alerts`, the tab) and **Revenue Execution Deal Alerts Manager** (`OpsGS__Revenue_Execution_Deal_Alerts_Manager`, changes) only to administrators who have View Setup and Configuration and see every opportunity (View All Data, or View All on Opportunities). Grant the custom permission **Revenue Execution Manage Deal Alerts** through a permission set your org owns; without it the tab is read-only. A permission set that grants View Setup and Configuration must also grant View Roles. Saving also needs Modify Metadata Through Metadata API Functions. With Revenue Execution Viewer too, the tab is last in the Revenue Execution app; otherwise use the App Launcher.
2. **Let Salesforce send and deliver.** Setup > Deliverability: Access level **All email**. Then verify the sender, because Salesforce silently drops mail from an unverified one: your own email address (in your personal settings, Personal Information; Salesforce emails you a verification link), or an organization-wide address (Setup > **Organization-Wide Addresses**) that you choose in Deal Alerts > **Settings**. Also authenticate your domain with DKIM keys (Setup > **DKIM Keys**) or Authorized Email Domains. Deal Alerts' Get started > **Check** confirms Salesforce allows sending and an organization-wide sender is verified, and warns if your own address shows unverified; only an arriving test confirms delivery.
3. **Set rules.** In Deal Alerts > **Rules**, turn on the sample **Past-due deals** or choose **New rule**. Saving shows the rule's counts first. Cards also offer Copy, Reset (an edited sample) and Hide or Remove; hidden rules can be restored. **Settings** holds the send time, weekdays, sender, limits, retention and subjects. Two monthly samples are there too: products that need help (choose who gets it) and salesperson win rate (to each salesperson's manager, and if you choose, the salesperson and the manager's manager; turning it on first asks you to confirm your company allows alerts that name people).
4. **Preview.** Deal Alerts > **Preview** shows which of your visible deals would email whom today, or why nobody would.
5. **Send yourself a test.** Deal Alerts' Get started > **Send test email** sends one deal email and one summary to you only, or just the summary when only monthly rules have something to show. When it arrives, choose **Yes, it arrived**; until you answer, the question comes back after a reload, and **Not yet** lists what to check. Once Deal Alerts is on, or after a sender change, send tests from **Settings**.
6. **Turn on.** After a Preview, choose **Turn on**, then either email the deals that already match on the first run or start quietly. It then runs hourly as you and sends once a day, within three hours of the send time.
7. **Turn off** at any time; nothing more is sent. Turn it off before a Deal Alerts deploy, upgrade or uninstall, and on again afterwards.
8. **Take over** when the administrator it runs as leaves or loses access: another administrator with the same access previews, confirms a test for the sender (their own when emails come from the person it runs as) and chooses **Take over**. Runs stop if that person is deactivated.

**What is sent, to whom.** Only to active internal users, by user record, never to an email address. The owner gets one email per deal, with every reason, and after 10 in a day one list for the rest. Managers, managers' managers and people named in a rule get one summary a day. Each email shows only the deals and fields that person can open; frozen users get nothing. When a day can't run, the administrator it runs as gets "Deal Alerts did not send today" with the reason and the fix. The send log keeps who got which kind of email for the retention period, never the content.

**Monthly checks.** On the first send day of each month, product and win-rate rules check each recipient's own view: figures count only deals that person can open and match their Product Overview or Sales Outcomes Team view, which the email links to. Someone whose view is over that dashboard's limits, or who lacks Revenue Execution Viewer or a field it reads, gets nothing and is counted on the rule card. A salesperson who gets their own win rate sees only their own figure, matching their Sales Outcomes My results. Nothing about a result is stored.

## Troubleshooting

Each subsection below matches one area heading in the Health view, in page order; the last covers saving in Configure Fields. Entries name rows by the short title Health shows. Choose **All** if you don't see a row.

- **Health or Configure Fields could not load:** click **Recheck**. If it keeps failing, confirm you hold Revenue Execution Configuration Health, then [get help](#get-help) and give the time it failed. A message that Admin / Setup "is available to Salesforce administrators with" its permission set means you don't hold that set.
- "… can't check with your access": get View Setup and Configuration, then Recheck.
- "… not checked this time": skipped for this page load only. Recheck.
- "… too many entries to check": your org has more permission entries than one check reads, so Recheck repeats the result. Check by hand, and record each under "Row not acted on or checked by hand" in the worksheet:
  - A permission set row: open it in Setup > Users > Permission Sets and compare it with [Grant access](#grant-access).
  - Viewer field access: confirm Read Access in your field-access permission set ([Grant access](#grant-access), step 4), then do [Verify](#verify), step 7.
  - Tab visibility: confirm that no profile or permission set without View Setup and Configuration shows the Admin / Setup tab.
- A Viewer who sees "Revenue Execution setup needs attention" on a dashboard is blocked by a Fail row under Settings or Outcome and product mappings.

### Access and assignment

- "Revenue Execution Viewer was changed" or "… is missing", Fail: the impact lists the differences. If someone added access, remove it and grant that access through a permission set your org owns. If the set is missing, or lacks access nobody removed, report it ([Get help](#get-help)). **Publish blocker:** repair by upgrade is not yet verified.
- "Viewer permission set: …", Info: Recheck. If it persists, check it by hand as above.
- "… has other entries", Info: reported for review, not failed.
- "Configuration Health permission set …": the same, for that permission set. Assign it only to administrators.
- "Mapping Editor permission set …": the same. Assign it only to administrators who save mappings.
- "Admin / Setup is visible to non-admins", Warning: set Admin / Setup to Tab Hidden on the listed profiles (Setup > Users > Profiles), or remove the tab from the listed permission sets. Those users see only an access message, never data.
- "No one has Revenue Execution Viewer", Fail: do [Grant access](#grant-access), step 1.
- "Only you have Revenue Execution Viewer", Info, under Needs attention: administrators read every field, so no Viewer was checked. Assign the Viewer to a dashboard user, then Recheck.
- "… have Revenue Execution Viewer" or "1 person has …", Info: the count. If it notes groups that aren't recalculated, it appears under Needs attention: in Setup > Users > Permission Set Groups, recalculate each group that includes Revenue Execution Viewer and whose status isn't Updated.
- "… fields need Viewer read access", Info: grant Read Access on the listed fields in your field-access permission set ([Grant access](#grant-access), step 4). It appears under Needs attention while it lists required fields and no Viewer other than you has been checked.
- Viewer field access:
  - "… Viewers can't read required fields", Fail: grant the objects and fields listed under Configuration through your own permission set, then Recheck.
  - "… Viewers miss optional features", Warning: grant Read Access on the fields behind the listed features, or turn those features off.
  - "No Viewers to check yet" or "Viewer field access: no Viewer checked", Info: assign the Viewer to at least one dashboard user, then Recheck.
- "One Viewer's object access differs", Info, under Needs attention: recalculate permission set groups that include the Viewer, then check the listed objects on Viewers' profiles.

### Settings

- "The Default setting is missing", Fail: every dashboard is blocked. In Setup > Custom Metadata Types > Revenue Execution Setting > Manage Records, click **New**. Enter `Default` as both Label and Revenue Execution Setting Name, enter each default from [Map your fields](#map-your-fields) or the worksheet, and click **Save**. Until then, dependent rows end "needs the Default setting".
- "Quarter basis needs a valid choice", "Outcome sample size isn't valid", or "… needs a new field" for Deal value, Pipeline date, or Owner credit, Fail, and "Deal-size bands aren't valid", "Close-timing horizons aren't valid", or "Close history isn't a valid choice", Warning: correct the setting as its [Map your fields](#map-your-fields) subsection describes.
- "Close-date history is off", Info: your choice.
- "Close-date history is not tracked", Info: [Pipeline date](#pipeline-date) isn't Close Date.
- "Dashboards read Close history differently", Fail: a Revenue Execution defect, not a setting. Leave the setting as it is, report it ([Get help](#get-help)), and Recheck after the fix is applied. **Publish blocker:** no upgrade path is available yet.

### Periods

- "No fiscal period covers today" or "Fiscal periods don't agree for today", Warning: in Setup > Company Settings > Fiscal Year, check the start month of a standard fiscal year, or define the custom fiscal year covering today. Or set Quarter Basis to Calendar quarters.
- "Next fiscal quarter isn't defined", Warning: define the next custom fiscal year before the current quarter ends.
- "Fiscal periods: can't check with your access", Warning: Recheck as an administrator with View Setup and Configuration.
- "Fiscal periods: waiting on Quarter basis", Info: fix the Quarter basis row first.

### Optional context

- "… needs a new field", "… is incomplete", "Escalation manager isn't a valid choice", or "Pipeline products needs a valid choice", Warning: correct the setting as its [Map your fields](#map-your-fields) subsection describes. For "Next step …", only readiness is off meanwhile; for "Account segment …", only the segment filter; for "Stage group …", only the phases.
- "Stage group puts no stage under a phase", Warning: in the field's Field Dependencies, in each stage's column, include exactly one phase (Include Values), then Save and Recheck. Until then, stages show on their own.
- "Stage group uses …", Pass, noting stages under more than one phase: each shows under its first phase. To change that, keep one phase in its column.
- "… is off" or "… are off", Info: your choice; the row says how to turn the feature on.
- "Required action is on" or "Escalation state is on", Pass: when the mapped field isn't one Revenue Execution Viewer already grants, the row lists a step to give Viewers Read Access. Off and invalid rows instead say how to turn the feature on or fix the setting.
- A row ending "you can't read it" reflects only your access. Viewer access is reported under Access and assignment.
- "Pipeline Schedule contexts: needs the Default setting", Info: appears only while the Default setting is missing.

### Outcome and product mappings

- "Outcome date needs a new field" or "Outcome date is incomplete", Fail, and "Outcome start date …", "Product family needs a new field", "Product line …", "Product tier …", or "Loss reason …", Warning: correct the setting as its [Map your fields](#map-your-fields) subsection describes. "Incomplete" means only one of the field and the label is set.
- "Product family repeats Product line", Warning: set Product family to a different Product field, or clear it to use Product Family. Meanwhile the portfolio starts at Product line.
- "Dashboards read Outcome date differently", Fail: a Revenue Execution defect, not a setting. Leave the setting as it is, report it ([Get help](#get-help)), and Recheck after the fix is applied. **Publish blocker:** no upgrade path is available yet.
- "… is off", Info: the state after install; the row says how to turn it on.
- "Outcome and product mappings: needs the Default setting", Info: appears only while the Default setting is missing.

### Risk tags

- "No risk tags are active", Info: the state after install. See [Risk tags](#risk-tags) to turn them on.
- "… active risk tags are excluded", Warning: Configuration lists each excluded tag with its reason. Edit each in Setup > Custom Metadata Types > Revenue Risk Tag > Manage Records to fix that reason, or clear Active. If the reason is "more than 25 tags are active", keep 25 or fewer active.
- The same title as Info: every excluded tag is marked "mapped field is not readable for you", which reflects only your access. No change is needed if Viewers can read the field; check "Viewer field access" under Access and assignment.

### Currency

- "Multiple currencies are on", Info: no setting changes this; see the [currency rule](#before-you-install) (step 5). Priced deal-size bands are unavailable. Tell Viewers.

### Stages

- "Over 200 stages are active" or "No open stage is active", Warning: in Setup > Object Manager > Opportunity > Fields & Relationships > Stage, keep at least one open stage and no more than 200 stages active. Until then, Pipeline Schedule can't show stage position. With several record types, stage order combines every active stage.

### Sharing

- "Opportunity sharing is …", always Info. With Private sharing, My results shows each Viewer's own deals, and Team, Leadership, and Executive show what sharing grants them. With Public Read Only or Public Read/Write, Team, Leadership, and Executive show every Opportunity to every Viewer. Accept this, or ask your security owner to review Setup > Security > Sharing Settings. Revenue Execution never changes sharing.
- "My results follows …": Pass while [Owner credit](#owner-credit) is Owner. Info with another field: access still follows Owner and sharing, so My results counts only the credited deals each Viewer can see. Nothing to fix.

### Products

- "No deals have products yet", Warning: add Opportunity Products, each from a price book entry. If you don't sell products, set Pipeline products to Disabled in Configure Fields; the row then reads "Products are off" (Info), and Product Overview stays empty.

### Deal Alerts

- Info rows such as "Deal Alerts is off" or "A Deal Alerts job is scheduled" need nothing unless you want alerts. "… but its job remains", Warning: turn Deal Alerts on and off again with View Setup and Configuration, or remove the job in Setup > Scheduled Jobs.
- "Deal Alerts didn't send today", "… missed its … run", "… runs as an inactive user", or "… is on, but nothing is scheduled", Fail: follow the row's steps; turning Deal Alerts on again makes it run as you. "… is paused until changes are checked": Deal Alerts > **Check changes**.
- "Salesforce paused the Deal Alerts job", Warning: it usually resumes; else resume it in Setup > Scheduled Jobs. "The last Deal Alerts run didn't finish", "The last run …" or "… over 6 hours", Warning: Deal Alerts > **Send log**.
- "Deal Alerts settings are missing", Fail: restore the Default record (Setup > Custom Metadata Types). "Salesforce won't let Deal Alerts send email", Fail: Setup > Deliverability, Access level All email.
- "The sender address isn't verified", Fail: verify it in Setup > Organization-Wide Addresses, or choose another sender.
- "No test email confirmed for this sender", Warning: Deal Alerts > **Settings** > **Send test email**, then **Yes, it arrived**. With your own address as sender, only the administrator Deal Alerts runs as can confirm it. No test arrives: check spam, then step 2.
- "No rule is on" or "… rules need attention", Fail: Deal Alerts > **Rules**. "Rules: too many entries to check": check them there. "Some people can't get a monthly alert", Warning: assign Revenue Execution Viewer and read on the dashboard's fields.
- "Some monthly checks were postponed" or "A monthly check was skipped this month", Warning: they catch up on the next send days, through the fifth; if it repeats, shorten the rule's period. "Too many deals for a monthly check", Warning: shorten the listed rules' period; a rule over 4,000 deals even in Current quarter can't run.
- "Deal Alerts permission sets were changed", Fail: undo the listed changes; give extra access through your own permission set. "… set is missing": [Get help](#get-help).
- "… show Deal Alerts", Warning: hide the tab on the listed profiles, or remove it from the listed permission sets.
- "… Deal Alerts users need changes", Warning: give both sets only to the administrators step 1 describes.
- "… too many entries to check" on the sets, tab or access rows: check holders and tab visibility in Setup.
- "… can't check with your access" or "… job not checked": get View Setup and Configuration, then Recheck.

### Saving in Configure Fields

Nothing changes unless the result says **Saved**.

- **Not saved yet:** nothing was sent. The message says why:
  - "Saving here is turned off for your user" or "Your user can't change metadata": see [Grant access](#grant-access), step 2, or use the Setup steps.
  - "Salesforce refused this request": try again in a minute; a deployment may already be running.
  - "Someone else changed these settings": click **Recheck**, choose again, then Preview and Save.
  - A label message: fix that label box.
  - "This save would stop dashboards from opening for Viewers": grant the read access Preview lists, or choose another field, then Preview and Save again.
- **Nothing to save:** the settings already hold your values.
- **Couldn't confirm:** the save may still be running. In Setup > Deployment Status, find the newest deployment. Succeeded: click **Check saved value**. Failed: nothing changed; use the Setup steps.
- **Settings changed while saving** or **Your earlier save landed:** click **Recheck** to see what the settings hold now.

## Get help

Email [support@opsgs.com](mailto:support@opsgs.com) ([Support](support.md)). Include:

1. The Revenue Execution version from Setup > Apps > Packaging > Installed Packages.
2. Your edition, and whether multiple currencies are enabled.
3. The area, status, and title of each Fail or Warning row, and the steps you already tried.

Never send passwords, usernames, record IDs, or customer data.
