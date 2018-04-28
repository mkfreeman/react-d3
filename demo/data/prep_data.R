# Data prep

# Use built in `midwest` data from the `ggplot2` package
library(ggplot2)
library(dplyr)
library(stringr)

# Replace values with full state names
prepped <- midwest %>%
  mutate(
    state = replace(state, state == "IL", "Illinois"),
    state = replace(state, state == "IN", "Indiana"),
    state = replace(state, state == "MI", "Michigan"),
    state = replace(state, state == "OH", "Ohio"),
    state = replace(state, state == "WI", "Wisconsin"),
    county = str_to_title(county)
  ) %>% 
  select(county, state, inmetro, contains("per"), -perchsd)

# Write data
write.csv("midwest.csv")