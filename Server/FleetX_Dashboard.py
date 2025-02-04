#http://localhost:8501/

import streamlit as st
import pandas as pd
import plotly.express as px


# Configure the default settings of the page
# page_title: The title of the web page
# layout: The layout of the page ('wide' or 'centered')
st.set_page_config(page_title='FleetX', layout='wide')

# Sidebar 
st.sidebar.title("FleetX")
st.sidebar.markdown("---")
st.sidebar.write("[Dashboard](#)")
st.sidebar.write("[Vehicles](#)")
st.sidebar.write("[Service](#)")
st.sidebar.write("[Reports](#)")
st.sidebar.write("[Settings](#)")

#Main title
st.title("FleetX Dashboard")

#Fake data
data = {
    "Status": ["Active", "Inactive", "In Shop", "Out of Service"],
    "Count": [144, 12, 2, 4]
}
df_status = pd.DataFrame(data)

service_data = {
    "Category": ["Overdue", "Due Soon"],
    "Count": [5, 23]
}
df_service = pd.DataFrame(service_data)

fuel_costs = pd.DataFrame({
    "Month": ["Jan", "Feb", "Mar", "Apr", "May"],
    "Cost ($)": [5000, 5200, 4900, 5100, 5300]
})

#Columns
col1, col2, col3 = st.columns(3)

#create the charts
with col1:
    st.subheader("Total Costs")
    fig_total_costs = px.bar(fuel_costs, x='Month', y='Cost ($)', title='Total Costs Over Time', color='Cost ($)', text_auto=True)
    st.plotly_chart(fig_total_costs, use_container_width=True)

with col2:
    st.subheader("Vehicle Status")
    st.dataframe(df_status, hide_index=True)

with col3:
    st.subheader("Service Reminders")
    st.dataframe(df_service, hide_index=True)

# additional columns
col4, col5 = st.columns(2)

with col4:
    st.subheader("On-Time Service Compliance")
    st.write("All-Time: **60%**")
    st.write("Last 30 Days: **72%**")

with col5:
    st.subheader("Recent Comments")
    comments = [
        "The tire has been replaced.",
        "Finishing up the job today!",
        "Is the vehicle ready to use?"
    ]
    for comment in comments:
        st.write(f"- {comment}")

# additional charts
maintenance_data = {
    "Month": ["Jan", "Feb", "Mar", "Apr", "May"],
    "Fuel Consumption (L)": [400, 420, 390, 430, 450],
    "Breakdowns": [2, 4, 1, 3, 5],
    "Distance (km)": [2000, 2100, 2200, 1800, 2500],
}

df_maintenance = pd.DataFrame(maintenance_data)

#maintenance costs categories
service_costs = {
    "Category": ["Tires", "Engine", "Brakes", "Others"],
    "Cost ($)": [1200, 2500, 800, 500]
}
df_service_costs = pd.DataFrame(service_costs)

#plotting the charts
col6, col7, col8 = st.columns(3)

with col6:
    st.subheader("Fuel Consumption Per Vehicle")
    fig_fuel = px.line(df_maintenance, x="Month", y="Fuel Consumption (L)", title="Fuel Consumption per Month")
    st.plotly_chart(fig_fuel, use_container_width=True)

with col7:
    st.subheader("Breakdowns per Month")
    fig_breakdowns = px.bar(df_maintenance, x="Month", y="Breakdowns", title="Breakdowns per Month", color="Breakdowns")
    st.plotly_chart(fig_breakdowns, use_container_width=True)

with col8:
    st.subheader("Distance Travelled per Vehicle")
    fig_distance = px.line(df_maintenance, x="Month", y="Distance (km)", title="Distance Travelled per Month")
    st.plotly_chart(fig_distance, use_container_width=True)

col9, col10 = st.columns(2)

with col9:
    st.subheader("Service Costs Breakdown")
    fig_service_costs = px.pie(df_service_costs, names='Category', values='Cost ($)', title="Service Costs Distribution")
    st.plotly_chart(fig_service_costs, use_container_width=True)

with col10:
    st.subheader("On-Time Service Compliance")
    st.write("All-Time: **60%**")
    st.write("Last 30 Days: **72%**")

