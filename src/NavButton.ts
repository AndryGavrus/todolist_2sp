import { Button, styled } from "@mui/material";

type Props = {
    background?: string
}

export const NavButton = styled(Button)<Props>(({ background, theme }) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    // boxShadow: '0 0 0 2px #054B62, 4px 4px 0 0 #054B62',
    borderRadius: '0px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: '#ffffff',
    background: background || theme.palette.primary.light,
    "&:hover": {
        background: theme.palette.primary.dark, // Новый цвет при наведении
        // boxShadow: "0 0 0 2px #054B62, 6px 6px 0 0 #054B62", // Увеличиваем тень
        transform: "translateY(-2px)", // Добавляем эффект поднятия
    },
}))