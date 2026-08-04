Bottom tab bar with the five brand tabs and SF Symbols-style stroke icons. Membership shows as a quiet gold dot on Sādhana, never a badge.

```jsx
<TabBar active="home" onChange={setView} />
<TabBar active="profile" tabs={[…,{id:"profile",label:"Sādhana",icon:"profile",dot:true}]} />
```
