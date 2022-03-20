import { Box, Paper, Typography, makeStyles } from "@material-ui/core"
import * as React from "react"

export interface StatisticItemProps {
  icon: React.ReactElement
  label: string
  value: string | number
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
  label: {},
  value: {},
  icon: {},
}))

export function StatisticItem({ icon, label, value }: StatisticItemProps) {
  const classes = useStyles()

  return (
    <Paper className={classes.root} elevation={3}>
      <Box className={classes.icon}>{icon}</Box>
      <Box>
        <Typography variant="h5" className={classes.value} align="right">
          {value}
        </Typography>
        <Typography variant="h5" className={classes.label}>
          {label}
        </Typography>
      </Box>
    </Paper>
  )
}
