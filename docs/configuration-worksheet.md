# Revenue Execution configuration worksheet

Fill this in as you follow the [admin guide](admin-guide.md), and keep it with your change records. If you saved in Admin / Setup, record the same values here. Record each prior value before you change it, so you can roll back. Where you can, record role or group names rather than individual users. Never record passwords.

**Publish blocker:** API names have no namespace prefix yet; the package will add one.

## Access decisions

| Decision | Guide step | Your decision | Done |
| --- | --- | --- | --- |
| Who gets Revenue Execution Viewer | [Grant access](admin-guide.md#grant-access), step 1 | | |
| Your permission set group that includes the Viewer, if any | [Grant access](admin-guide.md#grant-access), step 1 | | |
| Administrators who get Revenue Execution Configuration Health and the Viewer | [Grant access](admin-guide.md#grant-access), step 2 | | |
| Administrators allowed to save settings in Admin / Setup, if any, and the permission set granting Revenue Execution Edit Mappings | [Grant access](admin-guide.md#grant-access), step 2 | | |
| Name of your field-access permission set | [Grant access](admin-guide.md#grant-access), step 4 | | |
| Standard fields granted Read Access (Amount unless you map Deal value, Next Step unless you map Next step, and any field Health lists) | [Grant access](admin-guide.md#grant-access), step 4 | | |
| Mapped and risk tag fields granted Read Access | [Grant access](admin-guide.md#grant-access), step 4; [Risk tags](admin-guide.md#risk-tags), step 4 | | |
| Standard object and field reads verified | [Grant access](admin-guide.md#grant-access), step 5 | | |
| Administrators who get Revenue Execution Deal Alerts and Deal Alerts Manager, and the permission set granting Revenue Execution Manage Deal Alerts | [Deal Alerts](admin-guide.md#deal-alerts), step 1 | | |
| Deal Alerts sender, rules turned on, and who turned it on | [Deal Alerts](admin-guide.md#deal-alerts), steps 2-6 | | |
| Deal Alerts sender verified, and DKIM or Authorized Email Domains for its domain | [Deal Alerts](admin-guide.md#deal-alerts), step 2 | | |
| Who edits Required Response, Escalation State, and Revenue Risk, and through which permission set | [Roll out](admin-guide.md#roll-out), step 1 | | |

## Settings decisions

All settings are on the Default record: Setup > Custom Metadata Types > Revenue Execution Setting > Manage Records > Default > Edit. In Admin / Setup, Configure Fields > **Copy steps** gives the value to enter or choose and the prior value for each change, plus a To undo list; paste them into these rows. For Quarter basis, Close history, Escalation manager, and Pipeline products, the steps name the value as Setup shows it and its API value; record both.

| Setting | API name | Shipped default | Your field or value | Prior value | Done |
| --- | --- | --- | --- | --- | --- |
| [Deal value](admin-guide.md#deal-value) | `Deal_Value_Field_API_Name__c` | blank (uses `Amount`) | | | |
| [Owner credit](admin-guide.md#owner-credit) | `Owner_Credit_Field_API_Name__c` | blank (uses `OwnerId`) | | | |
| [Pipeline date](admin-guide.md#pipeline-date) | `Pipeline_Date_Field_API_Name__c` | blank (uses `CloseDate`) | | | |
| [Outcome date](admin-guide.md#outcome-date) field | `Outcome_Date_Field_API_Name__c` | `CloseDate` | | | |
| [Outcome date](admin-guide.md#outcome-date) label (typed in Configure Fields or Setup) | `Outcome_Date_Label__c` | Current Opportunity Close Date | | | |
| [Outcome sample size](admin-guide.md#outcome-sample-size) | `Outcome_Minimum_Sample_Size__c` | 5 | | | |
| [Quarter basis](admin-guide.md#quarter-basis) | `Quarter_Basis__c` | Calendar quarters (`CALENDAR`) | | | |
| [Outcome start date](admin-guide.md#outcome-start-date) field | `Outcome_Start_Date_Field_API_Name__c` | `CreatedDate` | | | |
| [Outcome start date](admin-guide.md#outcome-start-date) label (typed in Configure Fields or Setup) | `Outcome_Start_Date_Label__c` | Opportunity created (UTC) | | | |
| [Timeline start date](admin-guide.md#timeline-start-date) field | `Start_Date_Field_API_Name__c` | `CreatedDate` | | | |
| [Timeline start date](admin-guide.md#timeline-start-date) label (typed in Configure Fields or Setup) | `Start_Date_Label__c` | Opportunity created (UTC) | | | |
| [Close history](admin-guide.md#close-history) | `Close_History_Source__c` | Opportunity stage history (`OPPORTUNITY_HISTORY`) | | | |
| [Required action](admin-guide.md#required-action) | `Response_Field_API_Name__c` | `Required_Response__c` | | | |
| [Next step](admin-guide.md#next-step) | `Next_Step_Field_API_Name__c` | blank (uses `NextStep`) | | | |
| [Account segment](admin-guide.md#account-segment) | `Account_Segment_Field_API_Name__c` | blank (off) | | | |
| [Stage group](admin-guide.md#stage-group) | `Stage_Group_Field_API_Name__c` | blank (off) | | | |
| [Escalation state](admin-guide.md#escalation-state) | `Escalation_Field_API_Name__c` | `Escalation_State__c` | | | |
| [Escalation manager](admin-guide.md#escalation-manager) | `Manager_Context_Source__c` | Owner's manager (User.ManagerId) (`USER_MANAGER`) | | | |
| [Pipeline products](admin-guide.md#pipeline-products) | `Product_Context_Source__c` | Opportunity products (`OPPORTUNITY_PRODUCTS`) | | | |
| [Deal-size bands](admin-guide.md#deal-size-bands) One | `Deal_Band_One__c` | 50000 | | | |
| [Deal-size bands](admin-guide.md#deal-size-bands) Two | `Deal_Band_Two__c` | 100000 | | | |
| [Deal-size bands](admin-guide.md#deal-size-bands) Three | `Deal_Band_Three__c` | 250000 | | | |
| [Close timing](admin-guide.md#close-timing) One | `Horizon_One_Days__c` | 30 | | | |
| [Close timing](admin-guide.md#close-timing) Two | `Horizon_Two_Days__c` | 60 | | | |
| [Close timing](admin-guide.md#close-timing) Three | `Horizon_Three_Days__c` | 90 | | | |
| [Product family](admin-guide.md#product-family) | `Product_Family_Field_API_Name__c` | blank (uses `Family`) | | | |
| [Product line](admin-guide.md#product-line) field | `Product_Line_Field_API_Name__c` | blank | | | |
| [Product line](admin-guide.md#product-line) label (typed in Configure Fields or Setup) | `Product_Line_Label__c` | blank | | | |
| [Product tier](admin-guide.md#product-tier) field | `Product_Tier_Field_API_Name__c` | blank | | | |
| [Product tier](admin-guide.md#product-tier) label (typed in Configure Fields or Setup) | `Product_Tier_Label__c` | blank | | | |
| [Loss reason](admin-guide.md#loss-reason) field | `Loss_Reason_Field_API_Name__c` | blank | | | |
| [Loss reason](admin-guide.md#loss-reason) label (typed in Configure Fields or Setup) | `Loss_Reason_Label__c` | blank | | | |

## Risk tag decisions

Records are in Setup > Custom Metadata Types > Revenue Risk Tag > Manage Records. See [Risk tags](admin-guide.md#risk-tags). Health row: Risk tags, "… active risk tags …".

| Tag | Field API name | Operator | Match value | Shipped Active | Your decision | Prior value | Done |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Critical | `Revenue_Risk__c` | Equals | Critical | No | | | |
| High | `Revenue_Risk__c` | Equals | High | No | | | |
| Watch | `Revenue_Risk__c` | Equals | Watch | No | | | |
| Low | `Revenue_Risk__c` | Equals | Low | No | | | |
| New tags | | | | | | | |

## Sign-off

See [Verify](admin-guide.md#verify).

| Check | Result | Date |
| --- | --- | --- |
| Admin / Setup > Get started reads "You're ready", or each by-hand check recorded below | | |
| Admin / Setup > Health, Needs attention: "Nothing needs attention.", or each remaining row recorded below | | |
| Every row with steps done, or the reason recorded below | | |
| One Viewer opened each dashboard (you, logged in as them, or they did) without "setup needs attention" | | |
| Viewers told the dashboards are read-only and need a refresh after changes | | |

| Row not acted on or checked by hand | Reason |
| --- | --- |
| | |
