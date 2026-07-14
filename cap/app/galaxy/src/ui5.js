// Central registration of UI5 Web Components used across the app.
// Importing a component's module registers its custom element as a side effect.
// Import only what we use so the bundle stays tree-shaken.

// Theming: default to SAP Horizon; a light/dark/HCB switch lives in the ShellBar.
import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js'

// Core components
import '@ui5/webcomponents/dist/Button.js'
import '@ui5/webcomponents/dist/Card.js'
import '@ui5/webcomponents/dist/CardHeader.js'
import '@ui5/webcomponents/dist/BusyIndicator.js'
import '@ui5/webcomponents/dist/SegmentedButton.js'
import '@ui5/webcomponents/dist/SegmentedButtonItem.js'
import '@ui5/webcomponents/dist/Slider.js'
import '@ui5/webcomponents/dist/Label.js'
import '@ui5/webcomponents/dist/Title.js'
import '@ui5/webcomponents/dist/Text.js'
import '@ui5/webcomponents/dist/Tag.js'
import '@ui5/webcomponents/dist/Panel.js'
import '@ui5/webcomponents/dist/List.js'
import '@ui5/webcomponents/dist/ListItemStandard.js'
import '@ui5/webcomponents/dist/Select.js'
import '@ui5/webcomponents/dist/Option.js'
import '@ui5/webcomponents/dist/CheckBox.js'
import '@ui5/webcomponents/dist/Menu.js'
import '@ui5/webcomponents/dist/MenuItem.js'
import '@ui5/webcomponents/dist/Avatar.js'
import '@ui5/webcomponents/dist/Icon.js'

// Fiori shell components
import '@ui5/webcomponents-fiori/dist/ShellBar.js'
import '@ui5/webcomponents-fiori/dist/ShellBarItem.js'
import '@ui5/webcomponents-fiori/dist/SideNavigation.js'
import '@ui5/webcomponents-fiori/dist/SideNavigationItem.js'
import '@ui5/webcomponents-fiori/dist/NavigationLayout.js'
import '@ui5/webcomponents-fiori/dist/IllustratedMessage.js'
import '@ui5/webcomponents-fiori/dist/Timeline.js'
import '@ui5/webcomponents-fiori/dist/TimelineItem.js'

// Icons (referenced by name). Import only the ones used to keep the bundle lean.
import '@ui5/webcomponents-icons/dist/home.js'
import '@ui5/webcomponents-icons/dist/menu2.js'
import '@ui5/webcomponents-icons/dist/palette.js'
import '@ui5/webcomponents-icons/dist/customer.js'
import '@ui5/webcomponents-icons/dist/org-chart.js'
import '@ui5/webcomponents-icons/dist/source-code.js'
import '@ui5/webcomponents-icons/dist/bell.js'
import '@ui5/webcomponents-icons/dist/timesheet.js'
import '@ui5/webcomponents-icons/dist/sys-enter.js'
import '@ui5/webcomponents-icons/dist/activity-individual.js'

setTheme('sap_horizon')
