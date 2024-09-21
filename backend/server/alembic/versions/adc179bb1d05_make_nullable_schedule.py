"""add orientation to course

Revision ID: adc179bb1d05
Revises: 8aa824aa5a17
Create Date: 2024-09-21 18:32:12.024977

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'adc179bb1d05'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        'course', sa.Column('orientaion', sa.String(), nullable=True)
    )


def downgrade() -> None:
    pass
